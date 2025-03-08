import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home-left-menu',
  imports: [UiComponentsModule],
  templateUrl: './home-left-menu.component.html',
  styleUrl: './home-left-menu.component.scss'
})
export class HomeLeftMenuComponent {

  constructor(private router: Router, private authService: AuthService) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  async onClickLogOut(){
    await this.authService.logout();
  }
}
