import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { ProfileService } from '../../services/profile.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/UIModels';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
import { PostComponent } from "../../components/post/post.component";
import { MatDialog } from '@angular/material/dialog';
import { CreateTweetModalComponent } from '../../components/create-tweet-modal/create-tweet-modal.component';

@Component({
  selector: 'app-feed',
  imports: [UiComponentsModule, DatePipe, PostComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: true,
  providers: [DatePipe], 

})

export class FeedComponent {
  tweetText: string = '';
  @Input() showTweetModal = false;

  tweets: Post[] = []; 
  userProfile: any;

  isMobile: boolean = false;
  @ViewChild('tweetInput') tweetInput!: ElementRef; 

  headerTitle = 'Home';
  readonly dialog = inject(MatDialog);

  constructor(private profileService: ProfileService, 
    private postService: PostService,
    private deviceService: DeviceDetectorService,
  ) {
    this.isMobile = this.deviceService.isMobile();

    this.postService.getPosts().then(posts => {
      this.tweets = posts;
    });
    this.profileService.userProfile$.subscribe(profile => {
      if (profile) {
        this.userProfile = profile;
      }
    });
  }

  ngOnInit() {
    this.postService.tweetsUpdated$.subscribe((updated) => {
      if (updated) {
        this.postService.getPosts().then(posts => {
          this.tweets = posts;
        });
      }
    });
  }

  async postTweet() {
    this.postService.CreatePost(this.tweetText).then(() => {
      this.postService.getPosts().then(posts => {
        this.tweets = posts;
        this.showTweetModal = false;
        this.tweetText = "";
      });
    });
  }

  openTweetModal() {
    this.showTweetModal = true;
    setTimeout(() => {
      this.tweetInput?.nativeElement?.focus();
    }, 300);
  }

  removePostFromFeed(postId: string) {
    this.tweets = this.tweets.filter(post => post.id !== postId);
  }

    openDialog(): void {
      const dialogRef = this.dialog.open(CreateTweetModalComponent, {});
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
        }
      });
    }
}
