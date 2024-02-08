import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/features/dashboard/dashboard.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { roles } from 'src/roles';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
  }
];
