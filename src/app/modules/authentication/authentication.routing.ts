import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/features/page-login/login/login.component';
import { RegisterComponent } from 'src/app/features/page-login/register/register.component';
import { RouteData } from 'src/app/interfaces/input/roteData';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
