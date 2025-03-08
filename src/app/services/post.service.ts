import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Post, User } from '../models/UIModels';
import { SpinnerService } from './spinner.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private userProfile: User = {} as User;

  constructor(private spinner: SpinnerService, private profileService: ProfileService) {
    this.profileService.userProfile$.subscribe(profile => {
      if (profile) {
        this.userProfile.fullName = profile.displayName;
        this.userProfile.username = profile.username;
      }
    });
   }

  async getCurrentUserPosts() : Promise<Post[]> {
    this.spinner.show();
      const auth = getAuth();
      const user = auth.currentUser; 
      let posts : Post[] = [];
      if (user) {
        const db = getFirestore();
        const tweetsRef = collection(db, 'tweets');
        const tweetsQuery = query(tweetsRef, where('userId', '==', user.uid)); 
  
        try {
          const querySnapshot = await getDocs(tweetsQuery);
          let data : any[] = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() 
          }));
          
          posts = data.map((post : any) => ({
            username: post.username,
            userId: post.userId,
            fullName: post.fullName,
            createdAt: post.createdAt,
            avatarUrl: post.avatarUrl,
            text: post.text,
            id: post.id
          }));
          this.spinner.hide();
          return posts;
        } catch (error) {
          this.spinner.hide();
          return posts;
        }
      } else {
        this.spinner.hide();
        return posts;
      }
    }

    async CreatePost(postText: string) {
      this.spinner.show();
        if (!postText.trim()) return;
    
        const user = getAuth().currentUser;
        if (!user) {
          console.error("User not authenticated");
          return;
        }
    
        try {
          const tweetData = {
            text: postText,
            fullName: this.userProfile.fullName,
            username: this.userProfile.username,
            userId: user.uid,
            createdAt: new Date().toISOString()
          };
    
          // Save tweet to Firestore
          const db = getFirestore();
          await addDoc(collection(db, 'tweets'), tweetData);
    
          //postText = '';
        } catch (error) {
          console.error("Error posting tweet:", error);
        }
        this.spinner.hide();
      }

      async getPosts() : Promise<Post[]> {
        this.spinner.show();
          const db = getFirestore();
          const tweetQuerySnapshot = await getDocs(collection(db, 'tweets'));
          let posts : Post[] = [];

          let data : any[] = tweetQuerySnapshot.docs.map(doc => ({
            id: doc.id,      
            ...doc.data()   
          }));
          posts = data.map((post : any) => ({
            username: post.username,
            userId: post.userId,
            fullName: post.fullName,
            createdAt: post.createdAt,
            avatarUrl: post.avatarUrl,
            text: post.text,
            id: post.id
          }));
          this.spinner.hide();
          return posts;
        }
      
        async deleteTweet(tweetId: string) {
          const db = getFirestore();
          const tweetRef = doc(db, 'tweets', tweetId);
      
          try {
            await deleteDoc(tweetRef); 
            console.log('Tweet deleted successfully');
          } catch (error) {
            console.error('Error deleting tweet:', error);
          }
        }
}
