import { Routes } from '@angular/router';
import { CreateEditalComponent } from 'src/app/features/edital/create-edital/create-edital.component';
import { EditEditalComponent } from 'src/app/features/edital/edit-edital/edit-edital.component';
import { EditalTableComponent } from 'src/app/features/edital/edital-table/edital-table.component';
import { InfoEditalComponent } from 'src/app/features/edital/info-edital/info-edital.component';
import { PageEditalComponent } from 'src/app/features/home/page-edital/page-edital.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { LoginGuardService } from 'src/app/guards/login-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';
import { roles } from 'src/roles';

export const EditalRoutes: Routes = [
  {
    path: '',
    component: EditalTableComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'edital', // Adicione um identificador único para a rota
    } as RouteData,
  },
  {
    path: 'register',
    component: CreateEditalComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'edital-register', // Adicione um identificador único para a rota
    } as RouteData,
  },
  {
    path: 'info/:id',
    component: InfoEditalComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'edital-info', // Adicione um identificador único para a rota
    } as RouteData,
  },
  {
    path: 'edit/:id',
    component: EditEditalComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'edital-edit', // Adicione um identificador único para a rota
    } as RouteData,
  },
  {
    path: 'visualizareditais',
    component: PageEditalComponent,
  },
  {
    path: 'perguntas',
    loadChildren: () =>
      import('../pergunta/pergunta.module').then((m) => m.PerguntaModule),
    canActivate: [LoginGuardService],
  },
];
