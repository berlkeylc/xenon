import { Component, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { Router } from '@angular/router';

@Component({
  standalone: true,
   imports: [UiComponentsModule],
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css',
  providers: [
    ProfileService,
  ]
})
export class ProfileUpdateComponent {
  profileForm = new FormGroup({
    displayName: new FormControl(''),
    bio: new FormControl(''),
    username: new FormControl('')
  });

  profileImage = signal<string | null>(null);
  selectedFile: File | null = null;
  base64Image: string | null = null;

  headerTitle = 'Profile Update';

  constructor(private profileService: ProfileService,
    private router: Router
  ) {
    
    this.profileService.userProfile$.subscribe(profile => {
      if (profile) {
        this.profileForm.patchValue({
          displayName: profile.displayName,
          bio: profile.bio,
          username: profile.username
        });
        this.profileImage.set(profile.photoURL);
      }
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.profileImage.set(reader.result as string);
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async saveProfile() {
    const { displayName, bio, username } = this.profileForm.value;
    if(this.base64Image === null) {
      this.base64Image = this.profileImage();
    }
    await this.profileService.updateProfile(displayName!, bio!, this.base64Image!, username!).then(() => {
      this.router.navigate(['profile']);
  });
  }

  goBack(): void {
    this.router.navigate(['profile']); 
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
    }
  }


}
