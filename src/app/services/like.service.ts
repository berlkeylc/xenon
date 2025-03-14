import { Injectable } from '@angular/core';
import { collection, doc, getDoc, setDoc, deleteDoc, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private authService: AuthService) {}

  async toggleLike(postId: string) {
    const db = getFirestore();
    
    const userId = this.authService.getUser()?.uid; 

    if (!userId) {
      return;
    }

    const likeRef = doc(db, `likes/${postId}_${userId}`);
    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
      await deleteDoc(likeRef); 
      return false;
    } else {
      await setDoc(likeRef, { postId, userId });
      return true;
    }
  }

  async getLikesCount(postId: string) {
    const db = getFirestore();
    const likesCollection = collection(db, 'likes');
    const likesSnapshot = await getDocs(query(likesCollection, where('postId', '==', postId)));
    return likesSnapshot.size;
  }

  async isPostLiked(postId: string): Promise<boolean> {
    const db = getFirestore();

    const userId = this.authService.getUser()?.uid;
    if (!userId) return false;

    const likeRef = doc(db, `likes/${postId}_${userId}`);
    const likeSnap = await getDoc(likeRef);

    return likeSnap.exists();
  }

  async getLikes(postId: string) {
    const db = getFirestore();
    const likesCollection = collection(db, 'likes');
    const likesSnapshot = await getDocs(query(likesCollection, where('postId', '==', postId)));
    return likesSnapshot;
  }

}
