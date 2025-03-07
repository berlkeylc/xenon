import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../shared/ui-components.module';


@Component({
  selector: 'app-home-left-menu',
  imports: [UiComponentsModule],
  templateUrl: './home-left-menu.component.html',
  styleUrl: './home-left-menu.component.scss'
})
export class HomeLeftMenuComponent {

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToHome() {
    this.router.navigate(['']);
  }

}
