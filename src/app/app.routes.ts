import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProlileComponent } from './home/prolile/prolile.component';
import { FeedComponent } from './home/feed/feed.component';
import { WelcomePageComponent } from './flows/onboarding/welcome-page/welcome-page.component';
import { LoginPageComponent } from './flows/onboarding/login-page/login-page.component';
import { RegisterPageComponent } from './flows/onboarding/register-page/register-page.component';
import { ForgotPasswordComponent } from './flows/onboarding/forgot-password/forgot-password.component';
import { ForgotPasswordExecuteComponent } from './flows/onboarding/forgot-password/forgot-password-execute/forgot-password-execute.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileUpdateComponent } from './home/profile-update/profile-update.component';
import { FollowersComponent } from './home/followers/followers.component';

export const routes: Routes = [
  {
    path: 'welcome-page',
    component: WelcomePageComponent,
  },
  {
    path: 'login-page',
    component: LoginPageComponent,
  },
  {
    path: 'register-page',
    component: RegisterPageComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'forgot-password-execute',
    component: ForgotPasswordExecuteComponent,
  },
  {
      path: '',
      component: HomeComponent,
      children: [
        { path: '', component: FeedComponent },
        { path: 'profile/:id', component: ProlileComponent, runGuardsAndResolvers: 'always' },  // The :id is a dynamic parameter for user ID
        { path: 'profile', component: ProlileComponent, runGuardsAndResolvers: 'always'  },
        { path: 'profile-update', component: ProfileUpdateComponent },
        { path: 'followers/:id', component: FollowersComponent },
      ],
      canActivate: [AuthGuard] 
    },
];
