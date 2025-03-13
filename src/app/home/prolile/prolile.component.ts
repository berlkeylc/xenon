import { Component, inject } from '@angular/core';
import { User } from '../../models/UIModels';
import { UserService } from '../../services/user.service';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTweetModalComponent } from '../../components/create-tweet-modal/create-tweet-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  headerTitle = '';

  readonly dialog = inject(MatDialog);
  isMobile: boolean = false;

  constructor(private userService: UserService, 
    private postService: PostService,   
    private deviceService: DeviceDetectorService,
    private router: Router) {
      this.isMobile = this.deviceService.isMobile();
    }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => {
      this.userProfile = user;   
      this.headerTitle = user.displayName;
    });
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
    this.postService.tweetsUpdated$.subscribe((updated) => {
      if (updated) {
        this.postService.getCurrentUserPosts().then(posts => {
          this.tweets = posts;
        });
      }
    });
  }

  likedTweets = [
    { user: 'Jane Smith', content: 'Loving this new Twitter clone! 🔥', likes: 25 },
    { user: 'Mike Johnson', content: 'Who else is coding at 2 AM? 😂', likes: 8 },
  ];

  goToProfileUpdate(){
    this.router.navigate(['/profile-update']);
  }

  removeTweetFromFeed(tweetId: string) {
    this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTweetModalComponent, {});
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }
}
