import { Component } from '@angular/core';
import { User } from '../../models/UIModels';
import { UserService } from '../../services/user.service';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-prolile',
  imports: [UiComponentsModule],
  templateUrl: './prolile.component.html',
  styleUrl: './prolile.component.scss'
})
export class ProlileComponent {
  user: User | null = null;
  userProfile: User | null = null;
  tweets: any[] = [];

  constructor(private userService: UserService, 
    private postService: PostService,   
    private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => {
      this.userProfile = user;   });
    this.postService.getCurrentUserPosts().then(posts => {
      this.tweets = posts;    });
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data; 
      },
      (error) => {
        console.error('Kullanıcı verisi çekilirken hata oluştu:', error);
      }
    );
  }

  likedTweets = [
    { user: 'Jane Smith', content: 'Loving this new Twitter clone! 🔥', likes: 25 },
    { user: 'Mike Johnson', content: 'Who else is coding at 2 AM? 😂', likes: 8 },
  ];

  goToProfileUpdate(){
    this.router.navigate(['/profile-update']);
  }
}
