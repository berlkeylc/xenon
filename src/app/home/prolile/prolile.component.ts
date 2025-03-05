import { Component } from '@angular/core';
import { User } from '../../models/UIModels';
import { UserService } from '../../services/user.service';
import { UiComponentsModule } from '../../shared/ui-components/ui-components.module';

@Component({
  selector: 'app-prolile',
  imports: [UiComponentsModule],
  templateUrl: './prolile.component.html',
  styleUrl: './prolile.component.scss'
})
export class ProlileComponent {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data; 
      },
      (error) => {
        console.error('Kullanıcı verisi çekilirken hata oluştu:', error);
      }
    );
  }
  tweets = [
    { user: 'John Doe', content: 'Hello Twitter! 🚀', likes: 5 },
    { user: 'John Doe', content: 'Angular is awesome! ❤️', likes: 12 },
  ];

  likedTweets = [
    { user: 'Jane Smith', content: 'Loving this new Twitter clone! 🔥', likes: 25 },
    { user: 'Mike Johnson', content: 'Who else is coding at 2 AM? 😂', likes: 8 },
  ];

}
