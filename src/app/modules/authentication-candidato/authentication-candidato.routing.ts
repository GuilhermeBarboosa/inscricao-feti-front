import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/features/page-login/login/login.component';
import { LoginCandidatoComponent } from 'src/app/features/page-login/page-login-candidato/login-candidato/login-candidato.component';
import { RegisterCandidatoComponent } from 'src/app/features/page-login/page-login-candidato/register-candidato/register-candidato.component';
import { RegisterComponent } from 'src/app/features/page-login/register/register.component';

export const AuthenticationCandidatoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginCandidatoComponent,
      },
      {
        path: 'register',
        component: RegisterCandidatoComponent,
      },
    ],
  },
];
