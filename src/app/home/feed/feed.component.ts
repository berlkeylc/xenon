import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { UiComponentsModule } from '../../shared/ui-components/ui-components.module';

@Component({
  selector: 'app-feed',
  imports: [UiComponentsModule],
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
