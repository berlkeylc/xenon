import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  @Output() postCreated = new EventEmitter<any>(); 
  
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
      this.postCreated.emit(this.tweetText); 
        this.tweetText = "";
        this.dialogRef.close();
    });
  }

  openTweetModal() {
    setTimeout(() => {
      this.tweetInput?.nativeElement?.focus();
    }, 300);
  }

}
