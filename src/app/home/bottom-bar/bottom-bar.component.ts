import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../shared/ui-components/ui-components.module';

@Component({
  selector: 'app-bottom-bar',
  imports: [UiComponentsModule],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss'
})
export class BottomBarComponent {

    constructor(private router: Router) {}
  
    goToProfile() {
      this.router.navigate(['/profile']);
    }
  
    goToHome() {
      this.router.navigate(['']);
    }

}
