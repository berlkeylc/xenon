import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../../shared/ui-components.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [UiComponentsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  email = '';


  constructor(private fb: FormBuilder, private router: Router, 
    private authService: AuthService
  ) {
    
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.email);
    } else {
      console.log('Form not valid');
    }
  }

  onBack(){
    this.router.navigate(['/login-page']);
  }

}
