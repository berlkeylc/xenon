import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../../shared/ui-components.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-welcome-page',
  imports: [UiComponentsModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  showRegisterPage : boolean = false;

  constructor(private router: Router, 
    private authService: AuthService
  ) {}


  ngOnInit() {
  }

  explore() {
    this.showRegisterPage = true;

  }

  loginWithGoogle() {
    this.authService.googleSignIn();
  }

  goToEmail(){
       this.router.navigate(['login-page']); 
  }

  onClose(){
    this.showRegisterPage = false;

  }

}
