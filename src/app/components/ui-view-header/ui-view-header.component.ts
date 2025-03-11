import { Component, Input, } from '@angular/core';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-ui-view-header',
  imports: [MatIconModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './ui-view-header.component.html',
  styleUrl: './ui-view-header.component.scss'
})
export class UiViewHeaderComponent {
  @Input() title : string = "";
  @Input() isBackButtonEnabled : boolean = false;
  previousUrl: string | null = null;
  currentUrl: string | null = null;

  constructor(
      private router: Router,
      private navigationService: NavigationService
    ) {
  }

  ngOnInit() {
    this.previousUrl = this.navigationService.getPreviousUrl();
    this.currentUrl = this.navigationService.getCurrentUrl();
    console.log('Previous URL:', this.previousUrl);
  }

  goBack(): void {
    let navigationUrl : string = "";
    switch (this.currentUrl) {
      case "profile":
        navigationUrl = "";
        break;
      case "profile-update":
        navigationUrl = "profile";
        break;
    
      default:
        break;
    }
    this.router.navigate([navigationUrl]); 
  }

}
