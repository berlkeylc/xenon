import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/UIModels';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUser: User = {
    id: '1',
    displayName: 'Berke YALÇINER',
    email: 'johndoe@example.com',
    username: '@berlkeylc',
    bio: 'Frontend Developer | Tech Enthusiast',
    photoURL: 'https://pbs.twimg.com/profile_images/1804984492731289601/tcnURrO3_400x400.jpg',
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
              displayName: data.displayName,
              email: user.email ?? undefined,
              username: data.username,
              bio: data.bio,
              photoURL: data.photoURL,
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

  async getUsers(): Promise<User[]> {
    const db = getFirestore();

    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as User));
  }

  async getUserById(userId: string): Promise<User | null> {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);

    try {
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: userId,
          displayName: data['displayName'],
          email: data['email'],
          username: data['username'],
          bio: data['bio'],
          photoURL: data['photoURL'],
          location: data['location'],
          website: data['website'],
        } as User;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

}
