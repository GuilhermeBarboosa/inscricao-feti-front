import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/features/page-login/login/login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
      },
    ],
  },
];
