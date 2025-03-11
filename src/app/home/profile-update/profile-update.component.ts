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
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent {
  profileForm = new FormGroup({
    displayName: new FormControl(''),
    bio: new FormControl(''),
    username: new FormControl('')
  });

  profileImage = signal<string | null>(null);
  selectedFile: File | null = null;

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
    await this.profileService.updateProfile(displayName!, bio!, this.selectedFile!, username!);
  }

  goBack(): void {
    this.router.navigate(['profile']); 
  }

}
