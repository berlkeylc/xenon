import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-home-left-menu',
  imports: [MatSidenavModule, MatIconModule, 
    MatListModule, MatButtonModule, MatToolbarModule],
  templateUrl: './home-left-menu.component.html',
  styleUrl: './home-left-menu.component.scss'
})
export class HomeLeftMenuComponent {

}
