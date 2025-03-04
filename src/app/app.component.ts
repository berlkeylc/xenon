import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DashboardService]
})
export class AppComponent {
  title = 'xenon';
}
