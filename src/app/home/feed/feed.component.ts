import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [MatIconModule, 
      MatListModule, MatButtonModule, MatToolbarModule
    ,MatCardModule,MatDividerModule,MatInputModule, NgFor],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: true
})
export class FeedComponent {
  tweets = [
    { user: 'John Doe', handle: 'johndoe', content: 'This is my first tweet!' },
    { user: 'Jane Smith', handle: 'janesmith', content: 'Loving this Twitter clone!' },
    { user: 'Angular Dev', handle: 'angular_dev', content: 'Angular Material makes UI easy!' },
  ];

}
