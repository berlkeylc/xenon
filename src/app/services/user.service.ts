import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/UIModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUser: User = {
    id: 1,
    name: 'Berke YALÇINER',
    email: 'johndoe@example.com',
    username: '@berlkeylc',
    bio: 'Frontend Developer | Tech Enthusiast',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1804984492731289601/tcnURrO3_400x400.jpg',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
  };

  constructor() {}

  // Kullanıcı verilerini almak için servis fonksiyonu
  getUser(): Observable<User> {
    return of(this.mainUser);  // Ana kullanıcıyı Observable olarak döndürüyoruz
  }
  
}
