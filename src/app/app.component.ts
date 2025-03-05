import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { ScreenService } from './services/screen.service';
import { UiComponentsModule } from './shared/ui-components/ui-components.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,   UiComponentsModule
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DashboardService,  
  ]
})
export class AppComponent {
  isMobile: boolean;

  constructor(private screenService: ScreenService) {
    this.isMobile = this.screenService.isMobile;
    this.screenService.isMobile$.subscribe((value) => {
      this.isMobile = value;
    });
  }
}
