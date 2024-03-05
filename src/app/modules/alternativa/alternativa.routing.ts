import { Routes } from '@angular/router';
import { AlternativaTableComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/alternativa-table/alternativa-table.component';
import { CreateAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/create-alternativa/create-alternativa.component';
import { EditAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/edit-alternativa/edit-alternativa.component';
import { InfoAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/info-alternativa/info-alternativa.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';
import { roles } from 'src/roles';

export const AlternativaRoutes: Routes = [
  {
    path: ':idPergunta',
    component: AlternativaTableComponent,
    canActivate: [AuthGuardService],
       data: {
      route_identifier: 'alternativa',
    } as RouteData,
  },
  {
    path: ':idPergunta/register',
    component: CreateAlternativaComponent,
    canActivate: [AuthGuardService],
       data: {
      route_identifier: 'alternativa',
    } as RouteData,
  },
  {
    path: ':idPergunta/edit/:id',
    component: EditAlternativaComponent,
    canActivate: [AuthGuardService],
       data: {
      route_identifier: 'alternativa',
    } as RouteData,
  },
  {
    path: ':idPergunta/info/:id',
    component: InfoAlternativaComponent,
    canActivate: [AuthGuardService],
       data: {
      route_identifier: 'alternativa',
    } as RouteData,
  },
];
