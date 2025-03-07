import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signOut, getIdToken, sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  user = signal<User | null>(null);
  private auth = getAuth();


  constructor(
    private spinner: SpinnerService, 
    //private toastr: CustomToastrService, 
    private router: Router,) {
      onAuthStateChanged(this.auth, (user) => {
        this.user.set(user);
      });
  }

  async googleSignIn(): Promise<void> {
    this.spinner.show();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['']); 
      this.spinner.hide(); 
    } catch (error) {
      this.spinner.hide(); 
    }
  }

  async loginWithFacebook(): Promise<void> {
    this.spinner.show(); 
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['']); 
      this.spinner.hide();  
    } catch (error) {
      this.spinner.hide();
    }
  }

  async login(email: string, password: string) {
    this.spinner.show();  
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(
      () => {
        this.router.navigate(['']);
        this.spinner.hide();  
      },
      error => {
        this.spinner.hide();  
      }
    );
  }

  async register(email: string, password: string) {
    this.spinner.show();  
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(
      (userCredential) => {
        this.router.navigate(['']);
        this.spinner.hide();  
      },
      error => {
        this.spinner.hide();  
      }
    );
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['welcome-page']); 
      this.spinner.hide(); 
    } catch (error) {
      this.spinner.hide();
    }
  }

  // getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }

  async getToken(): Promise<string | null> {
    if (this.auth.currentUser) {
      return await getIdToken(this.auth.currentUser);
    }
    return null;
  }

  // isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   return !!token;
  // }
  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUser(): User | null {
    return this.user();
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.router.navigate(['/forgot-password-execute']);
      this.spinner.hide(); 
    } catch (error) {
      this.spinner.hide();
    }
  }
}