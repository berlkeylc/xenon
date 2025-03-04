import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProlileComponent } from './home/prolile/prolile.component';
import { FeedComponent } from './home/feed/feed.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: FeedComponent },
          { path: 'profile', component: ProlileComponent },
        ],
      },
];
