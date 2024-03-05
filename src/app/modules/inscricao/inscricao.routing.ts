import { Routes } from '@angular/router';
import { InscricoesComponent } from 'src/app/features/home/inscricoes/inscricoes.component';
import { EditInscricaoComponent } from 'src/app/features/inscricao/edit-inscricao/edit-inscricao.component';
import { InfoAllInscricaoComponent } from 'src/app/features/inscricao/info-all-inscricao/info-all-inscricao.component';
import { InscricaoTableComponent } from 'src/app/features/inscricao/inscricao-table/inscricao-table.component';
import { RouteData } from 'src/app/interfaces/input/roteData';

export const InscricaoRoutes: Routes = [
  {
    path: '',
    component: InscricaoTableComponent,
    data: {
      route_identifier: 'inscricao',
    } as RouteData,
  },
  {
    path: 'infoAll/:id',
    component: InfoAllInscricaoComponent,
    data: {
      route_identifier: 'inscricao',
    } as RouteData,
  },
  {
    path: 'fazerinscricao/:idEdital',
    component: InscricoesComponent,
  },
  {
    path: 'edit/:id',
    component: EditInscricaoComponent
  }
];
