import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/features/dashboard/dashboard.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';
import { roles } from 'src/roles';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'dashboard', // Adicione um identificador único para a rota
    } as RouteData,
  }
];
