import { Routes } from '@angular/router';
import { PageEditalComponent } from 'src/app/features/home/page-edital/page-edital.component';

export const EditalRoutes: Routes = [
  {
    path: '',
    component: PageEditalComponent,
  },
  {
    path: 'inscricao/:idEdital',
    loadChildren: () =>
      import('../inscricao/inscricao.module').then(
        (m) => m.InscricaoModule
      ),
      // canActivate: [LoginGuardService],
  },
  {
    path: 'perguntas',
    loadChildren: () =>
      import('../pergunta/pergunta.module').then(
        (m) => m.PerguntaModule
      ),
      // canActivate: [LoginGuardService],
  },
];
