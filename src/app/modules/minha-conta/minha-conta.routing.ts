import { Routes } from '@angular/router';
import { InicioComponent } from 'src/app/features/home/inicio/inicio.component';
import { MinhaContaComponent } from 'src/app/features/home/minha-conta/minha-conta.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

export const MinhaContaRoutes: Routes = [
  {
    path: '',
    component: MinhaContaComponent,
    // canActivate: [AuthGuardService],
  }
];
