import { Injectable } from '@angular/core';
import { collection, doc, getDoc, setDoc, deleteDoc, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private authService: AuthService) {}

  async toggleFollow(followedUserId: string) {
    const db = getFirestore();
    
    const userId = this.authService.getUser()?.uid;

    if (!userId) {
      return;
    }

    const followRef = doc(db, `follows/${userId}_${followedUserId}`);
    const followSnap = await getDoc(followRef);

    if (followSnap.exists()) {
      await deleteDoc(followRef);
      return false;
    } else {
      await setDoc(followRef, { followerId: userId, followedId: followedUserId });
      return true;
    }
  }

  async getFollowersCount(userId: string) {
    const db = getFirestore();
    const followsCollection = collection(db, 'follows');
    const followersSnapshot = await getDocs(query(followsCollection, where('followedId', '==', userId)));
    return followersSnapshot.size;
  }

  async getFollowingCount(userId: string) {
    const db = getFirestore();
    const followsCollection = collection(db, 'follows');
    const followingSnapshot = await getDocs(query(followsCollection, where('followerId', '==', userId)));
    return followingSnapshot.size;
  }

  async isFollowing(followedUserId: string): Promise<boolean> {
    const db = getFirestore();

    const userId = this.authService.getUser()?.uid;
    if (!userId) return false;

    const followRef = doc(db, `follows/${userId}_${followedUserId}`);
    const followSnap = await getDoc(followRef);

    return followSnap.exists();
  }

  async getFollowers(userId: string) {
    const db = getFirestore();
    const followsCollection = collection(db, 'follows');
    const followersSnapshot = await getDocs(query(followsCollection, where('followedId', '==', userId)));
    return followersSnapshot;
  }

  async getFollowing(userId: string) {
    const db = getFirestore();
    const followsCollection = collection(db, 'follows');
    const followingSnapshot = await getDocs(query(followsCollection, where('followerId', '==', userId)));
    return followingSnapshot;
  }
} 