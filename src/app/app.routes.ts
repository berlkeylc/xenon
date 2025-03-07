import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProlileComponent } from './home/prolile/prolile.component';
import { FeedComponent } from './home/feed/feed.component';
import { WelcomePageComponent } from './flows/onboarding/welcome-page/welcome-page.component';
import { LoginPageComponent } from './flows/onboarding/login-page/login-page.component';
import { RegisterPageComponent } from './flows/onboarding/register-page/register-page.component';
import { ForgotPasswordComponent } from './flows/onboarding/forgot-password/forgot-password.component';
import { ForgotPasswordExecuteComponent } from './flows/onboarding/forgot-password/forgot-password-execute/forgot-password-execute.component';

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
          { path: 'profile', component: ProlileComponent },
        ],
      },
];
