import { DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/UIModels';

@Component({
  selector: 'app-post',
  imports: [MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgFor
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
    providers: [DatePipe], 
})
export class PostComponent {

  @Input() tweets: Post[] = []; 
  
  constructor(private datePipe: DatePipe,
        private postService: PostService,
  ) {
  }

  async deleteTweet(tweetId: string) {
    this.postService.deleteTweet(tweetId).then(() => {
      this.postService.getPosts().then(posts => {
        this.tweets = posts;
      });
    });
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '';

    let date: Date;

  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp); 
  }
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000); 
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now'; 
    if (diffInMinutes < 60) return `${diffInMinutes}m`; 
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`; 
    
    const thisYear = now.getFullYear();
    const tweetYear = date.getFullYear();
    if (thisYear === tweetYear) {
      return this.datePipe.transform(date, 'MMM d') ?? ''; 
    }

    return this.datePipe.transform(date, 'MMM d, y') ?? ''; 
  }
}
