import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { Post, User } from '../models/UIModels';
import { SpinnerService } from './spinner.service';
import { ProfileService } from './profile.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private userProfile: User = {} as User;

  private tweetsUpdated = new BehaviorSubject<boolean>(false);
  tweetsUpdated$ = this.tweetsUpdated.asObservable();

  constructor(private spinner: SpinnerService, private profileService: ProfileService) {
    this.profileService.userProfile$.subscribe(profile => {
      if (profile) {
        this.userProfile.displayName = profile.displayName;
        this.userProfile.username = profile.username;
        this.userProfile.photoURL = profile.photoURL;
      }
    });
   }

  async getCurrentUserPosts() : Promise<Post[]> {
    this.spinner.show();
    const db = getFirestore();
    const tweetsRef = collection(db, 'tweets');
    const auth = getAuth();

    const user = auth.currentUser; 
    const q = query(tweetsRef, where('userId', '==', user?.uid));
    
    const snapshot = await getDocs(q);

    let tweets: Post[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const tweetData = docSnap.data() as Post;
        const userData = await this.getUser(tweetData.userId);
        return {
          ...tweetData,
          id: docSnap.id,
          fullName: userData?.displayName || 'Unknown',
          username: userData?.username || 'unknown',
          avatarUrl: userData?.photoURL || '',
        };
      })
    );
    tweets = tweets.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
      
    this.spinner.hide();
    return tweets;
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
            fullName: this.userProfile.displayName,
            username: this.userProfile.username,
            userId: user.uid,
            avatarUrl: this.userProfile.photoURL,
            createdAt: new Date().toISOString()
          };
    
          // Save tweet to Firestore
          const db = getFirestore();
          await addDoc(collection(db, 'tweets'), tweetData);
          this.tweetsUpdated.next(true);
          //postText = '';
        } catch (error) {
          console.error("Error posting tweet:", error);
        }
        this.spinner.hide();
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

        async getPosts(): Promise<Post[]> {
          this.spinner.show();
          const db = getFirestore();
          const tweetsRef = collection(db, 'tweets');
          const q = query(tweetsRef, orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
      
          const tweets: Post[] = await Promise.all(
            snapshot.docs.map(async (docSnap) => {
              const tweetData = docSnap.data() as Post;
              const userData = await this.getUser(tweetData.userId);
              return {
                ...tweetData,
                id: docSnap.id,
                fullName: userData?.displayName || 'Unknown',
                username: userData?.username || 'unknown',
                avatarUrl: userData?.photoURL || '',
              };
            })
          );
          this.spinner.hide();
          return tweets;
        }

        private async getUser(userId: string): Promise<User | null> {
          const db = getFirestore();
          const userRef = doc(db, 'users', userId);
          const userSnap = await getDoc(userRef);
          return userSnap.exists() ? (userSnap.data() as User) : null;
        }
}
