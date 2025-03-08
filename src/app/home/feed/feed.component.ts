import { Component } from '@angular/core';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { ProfileService } from '../../services/profile.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/UIModels';

@Component({
  selector: 'app-feed',
  imports: [UiComponentsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: true
})

export class FeedComponent {
  tweetText: string = '';

  tweets: Post[] = []; 
  userProfile: any;

  constructor(private profileService: ProfileService, 
    private postService: PostService
  ) {
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
  }

  async postTweet() {
    this.postService.CreatePost(this.tweetText).then(() => {
      this.postService.getPosts().then(posts => {
        this.tweets = posts;
      });
    });
  }

  async deleteTweet(tweetId: string) {
    this.postService.deleteTweet(tweetId).then(() => {
      this.postService.getPosts().then(posts => {
        this.tweets = posts;
      });
    });
  }
}
