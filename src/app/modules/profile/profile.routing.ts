import { Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/features/page-login/profile/profile.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { roles } from 'src/roles';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesArray:[
         {
          role: roles.ROLE_ADMIN
         },
         {
          role: roles.ROLE_SECRETARIO
         }
      ]
    },
  },
];
