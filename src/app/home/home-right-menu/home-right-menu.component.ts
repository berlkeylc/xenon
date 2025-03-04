import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home-right-menu',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './home-right-menu.component.html',
  styleUrl: './home-right-menu.component.scss'
})
export class HomeRightMenuComponent {
  suggestedUsers = [
    { name: 'Elon Musk', handle: 'elonmusk', avatar: 'https://source.boringavatars.com/beam/40/elon' },
    { name: 'Angular', handle: 'angular', avatar: 'https://source.boringavatars.com/beam/40/angular' },
    { name: 'Google Devs', handle: 'googledevs', avatar: 'https://source.boringavatars.com/beam/40/google' },
  ];
}
