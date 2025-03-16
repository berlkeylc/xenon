import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/UIModels';
import { UserService } from '../../services/user.service';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTweetModalComponent } from '../../components/create-tweet-modal/create-tweet-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prolile',
  imports: [UiComponentsModule],
  templateUrl: './prolile.component.html',
  styleUrl: './prolile.component.scss'
})
export class ProlileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userProfile: User | null = null;
  currentUserProfile: User | null = null;

  tweets: any[] = [];
  headerTitle = '';

  readonly dialog = inject(MatDialog);
  isMobile: boolean = false;
  isFabVisible : boolean = true;
  userId: string;
  isCurrentUser : boolean = false;

  paramId!: string;
  private routeSub!: Subscription;
  constructor(private userService: UserService, 
    private postService: PostService,   
    private deviceService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute) {
      this.isMobile = this.deviceService.isMobile();
      this.userId = this.route.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const newId = params.get('id');
      if(newId && !this.paramId){
        this.paramId = newId;
      }
      if (newId && newId !== this.paramId) {
        this.paramId = newId;
        this.reloadPage();
      }
    });

    this.userService.getCurrentUser().then(user => {
      this.currentUserProfile = user; 
      
      if(this.userId){
        this.userService.getUserById(this.userId).then((data) => {
            this.userProfile = data;
            this.headerTitle = this.userProfile?.displayName ?? '';
            if(this.userProfile?.id === this.currentUserProfile?.id){
              this.isCurrentUser = true;
            }
          }
        );
      } else {
        this.isCurrentUser = true;
        this.headerTitle = user.displayName;
      }
      if(!this.userProfile){
        this.userProfile = this.currentUserProfile;
      }

      if(this.isCurrentUser){
        this.postService.getCurrentUserPosts().then(posts => {
          this.tweets = posts;    });

          this.postService.tweetsUpdated$.subscribe((updated) => {
            if (updated) {
              this.postService.getCurrentUserPosts().then(posts => {
                this.tweets = posts;
              });
            }
          });
      } else {
        this.postService.getPostsByUserId(this.userId).then(posts => {
          this.tweets = posts;    });
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
    this.isFabVisible = false
    dialogRef.afterClosed().subscribe(result => {
      this.isFabVisible = true
    });
  }

  reloadPage() {
    this.router.navigate([], { queryParamsHandling: 'preserve' }).then(() => {
      window.location.reload(); 
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
