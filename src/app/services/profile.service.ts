import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { SpinnerService } from './spinner.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfile = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfile.asObservable();

  private db = getFirestore();
  private storage = getStorage();

  constructor(private spinner: SpinnerService,) {
    this.loadUserProfile();
  }

  private async loadUserProfile() {
    const user = getAuth().currentUser;
    if (user) {
      const userDocRef = doc(collection(this.db, 'users'), user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        this.userProfile.next(userDoc.data());
      }
    }
  }

  async updateProfile(displayName: string, bio: string, photoFile64?: string, username?: string) {
    this.spinner.show();
    const user = getAuth().currentUser;
    if (!user) return;

    const updatedProfile = { displayName, bio, photoURL :  photoFile64, username: username };

    const userDocRef = doc(collection(this.db, 'users'), user.uid);
    await setDoc(userDocRef, updatedProfile, { merge: true });
    this.userProfile.next(updatedProfile);
    this.spinner.hide();
  }
}
