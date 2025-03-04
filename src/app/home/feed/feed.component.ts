import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

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
  tweets: any[] = []; 

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.tweets = this.dashboardService.getTweets() ?? [];
  }
}
