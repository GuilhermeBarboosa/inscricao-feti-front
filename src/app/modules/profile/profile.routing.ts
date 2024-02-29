import { Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/features/page-login/profile/profile.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';
import { roles } from 'src/roles';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'profile', // Adicione um identificador único para a rota
    } as RouteData,
  },
];
