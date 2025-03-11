import { Component, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTweetModalComponent } from '../../components/create-tweet-modal/create-tweet-modal.component';


@Component({
  selector: 'app-home-left-menu',
  imports: [UiComponentsModule],
  templateUrl: './home-left-menu.component.html',
  styleUrl: './home-left-menu.component.scss'
})
export class HomeLeftMenuComponent {

  @Output() showTweetModal = false;
  readonly dialog = inject(MatDialog);

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

  onClickPost() {
    this.showTweetModal = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTweetModalComponent, {
      width: '600px',
      height: '400px',
      maxWidth: '90vw', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }
}
