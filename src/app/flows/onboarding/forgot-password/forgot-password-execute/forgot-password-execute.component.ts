import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../../../shared/ui-components.module';

@Component({
  selector: 'app-forgot-password-execute',
  imports: [UiComponentsModule],
  templateUrl: './forgot-password-execute.component.html',
  styleUrl: './forgot-password-execute.component.scss'
})
export class ForgotPasswordExecuteComponent {
  constructor(private router: Router) {}

  navigateToHome(){
    this.router.navigate(['landing-page']); 
  }
}
