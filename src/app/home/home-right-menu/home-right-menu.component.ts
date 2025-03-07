import { Component } from '@angular/core';
import { UiComponentsModule } from '../../shared/ui-components.module';

@Component({
  selector: 'app-home-right-menu',
  imports: [UiComponentsModule],
  templateUrl: './home-right-menu.component.html',
  styleUrl: './home-right-menu.component.scss'
})
export class HomeRightMenuComponent {
  users: any[] = [
    {
      name: 'İstanbul Büyükşehir...',
      username: '@istanbulbld',
      avatar: 'https://pbs.twimg.com/profile_images/1375346172106260480/2AeQRMiq_400x400.jpg', 
    },
    {
      name: 'Şebnem Ferah',
      username: '@sebnemferah',
      avatar: 'https://pbs.twimg.com/profile_images/3654826863/7359bb55820f8190566ca26e49855fd7_400x400.jpeg',
    },
    {
      name: 'Kadıköy Belediyesi',
      username: '@kadikoybelediye',
      avatar: 'https://pbs.twimg.com/profile_images/1874717981705412608/OHeVOWrK_400x400.jpg',
    },
  ];
}
