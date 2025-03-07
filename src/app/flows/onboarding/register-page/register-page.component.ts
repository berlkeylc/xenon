import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../../shared/ui-components.module';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register-page',
  imports: [UiComponentsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  email = '';
  password = '';

  constructor(private fb: FormBuilder, private router: Router, 
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      await this.authService.register(this.email, this.password);
    } 
  }

  onBack(){
    this.router.navigate(['/login-page']);
  }

  goToLogin(){
    this.router.navigate(['/login-page']);
  }
}
