import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/UIModels';
import { UiComponentsModule } from '../../shared/ui-components.module';

@Component({
  selector: 'app-create-tweet-modal',
  imports: [
UiComponentsModule
  ],  templateUrl: './create-tweet-modal.component.html',
  styleUrl: './create-tweet-modal.component.scss'
})
export class CreateTweetModalComponent {
  readonly dialogRef = inject(MatDialogRef<CreateTweetModalComponent>);
  tweetText: string = '';
  tweets: Post[] = []; 
  @ViewChild('tweetInput') tweetInput!: ElementRef; 
    
  
  constructor(
        private postService: PostService,
  ) { 
    this.openTweetModal();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async postTweet() {
    this.postService.CreatePost(this.tweetText).then(() => {
      this.postService.getPosts().then(posts => {
        this.tweets = posts;
        this.tweetText = "";
        this.dialogRef.close();
      });
    });
  }

  openTweetModal() {
    setTimeout(() => {
      this.tweetInput?.nativeElement?.focus();
    }, 300);
  }

}
