// src/app/firebase-config/firebase-config.component.ts
import { Component} from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-firebase-config',
  standalone: true,
  template: '<p>Firebase Initialized</p>',
})
export class FirebaseConfigComponent {
  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
  }
}