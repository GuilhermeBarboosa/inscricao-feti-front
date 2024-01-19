import { Routes } from '@angular/router';
import { InscricoesComponent } from 'src/app/features/home/inscricoes/inscricoes.component';
import { ListInscricoesComponent } from 'src/app/features/home/list-inscricoes/list-inscricoes.component';
import { MinhaInscricaoComponent } from 'src/app/features/home/minha-inscricao/minha-inscricao.component';

export const MinhaInscricaoRoutes: Routes = [
  {
    path: '',
    component: ListInscricoesComponent,
  },
  {
    path: 'info/:id',
    component: MinhaInscricaoComponent,
  },
];
