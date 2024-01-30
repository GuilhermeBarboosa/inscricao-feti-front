import { Routes } from '@angular/router';
import { InicioComponent } from 'src/app/features/home/inicio/inicio.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

export const InicioRoutes: Routes = [
  {
    path: '',
    component: InicioComponent,
    // canActivate: [AuthGuardService],
  }
];
