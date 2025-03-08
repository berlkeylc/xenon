import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/UIModels';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUser: User = {
    id: '1',
    fullName: 'Berke YALÇINER',
    email: 'johndoe@example.com',
    username: '@berlkeylc',
    bio: 'Frontend Developer | Tech Enthusiast',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1804984492731289601/tcnURrO3_400x400.jpg',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
  };

  constructor(private spinner: SpinnerService, ) {}

  getUser(): Observable<User> {
    return of(this.mainUser);  
  }

  async getCurrentUser(): Promise<User> {
    this.spinner.show();
      const auth = getAuth();
      const user = auth.currentUser; 
      let currentUser : User = {} as User;
  
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
  
        try {
          const docSnap = await getDoc(userRef);
  
          if (docSnap.exists()) {
            let data : any = docSnap.data();
            currentUser = {
              id: user.uid,
              fullName: data.displayName,
              email: user.email ?? undefined,
              username: data.username,
              bio: data.bio,
              avatarUrl: data.photoURL,
            };
            this.spinner.hide();
            return currentUser;
          } else {
            this.spinner.hide();
            return currentUser;
          }
        } catch (error) {
          this.spinner.hide();
          return currentUser;
        }
      } else {
        this.spinner.hide();
        return currentUser;
      }
  
    }
  
}
