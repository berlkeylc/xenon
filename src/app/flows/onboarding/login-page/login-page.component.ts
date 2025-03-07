import { Component } from '@angular/core';
import { UiComponentsModule } from '../../../shared/ui-components.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-login-page',
  imports: [UiComponentsModule,],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  hide = true;

  email = '';
  password = '';

  constructor(private fb: FormBuilder, private router: Router,  
    private authService: AuthService,private spinner: SpinnerService, 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(this.email, this.password);
      } catch (error) {
        console.error('Login failed', error);
      }
    } else {
      console.log('Form not valid');
    }
  }

  onBack(){
    this.router.navigate(['/welcome-page']);
  }

  goToRegister(){
    this.router.navigate(['/register-page']);
  }

  goToForgotPassword(){
    this.router.navigate(['/forgot-password']);

  }
}
