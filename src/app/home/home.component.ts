import { Component } from '@angular/core';
import { HomeLeftMenuComponent } from './home-left-menu/home-left-menu.component';
import { HomeRightMenuComponent } from './home-right-menu/home-right-menu.component';
import { RouterOutlet } from '@angular/router';
import { ScreenService } from '../services/screen.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { UiComponentsModule } from '../shared/ui-components.module';

@Component({
  selector: 'app-home',
  imports: [
    UiComponentsModule,
    HomeLeftMenuComponent,
    HomeRightMenuComponent, 
    RouterOutlet, 
    BottomBarComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isMobile: boolean = false;

  constructor(private screenService: ScreenService, private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
  }

}
