import { Routes } from '@angular/router';
import { InscricoesComponent } from 'src/app/features/home/inscricoes/inscricoes.component';
import { EditInscricaoComponent } from 'src/app/features/inscricao/edit-inscricao/edit-inscricao.component';
import { InfoAllInscricaoComponent } from 'src/app/features/inscricao/info-all-inscricao/info-all-inscricao.component';
import { InscricaoTableComponent } from 'src/app/features/inscricao/inscricao-table/inscricao-table.component';

export const InscricaoRoutes: Routes = [
  {
    path: '',
    component: InscricaoTableComponent,
  },
  {
    path: 'infoAll/:id',
    component: InfoAllInscricaoComponent,
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
