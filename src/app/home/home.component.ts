import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { HomeLeftMenuComponent } from './home-left-menu/home-left-menu.component';
import { HomeRightMenuComponent } from './home-right-menu/home-right-menu.component';
import { FeedComponent } from "./feed/feed.component";

@Component({
  selector: 'app-home',
  imports: [MatGridListModule,
    MatListModule,
    HomeLeftMenuComponent,
    HomeRightMenuComponent, FeedComponent, HomeRightMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
