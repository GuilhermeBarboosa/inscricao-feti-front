import { Routes } from '@angular/router';
import { CreateEditalComponent } from 'src/app/features/edital/create-edital/create-edital.component';
import { EditEditalComponent } from 'src/app/features/edital/edit-edital/edit-edital.component';
import { EditalTableComponent } from 'src/app/features/edital/edital-table/edital-table.component';
import { InfoEditalComponent } from 'src/app/features/edital/info-edital/info-edital.component';
import { PageEditalComponent } from 'src/app/features/home/page-edital/page-edital.component';

export const EditalRoutes: Routes = [
  {
    path: '',
    component: EditalTableComponent,
  },
  {
    path: 'register',
    component: CreateEditalComponent,
  },
  {
    path: 'info/:id',
    component: InfoEditalComponent,
  },
  {
    path: 'edit/:id',
    component: EditEditalComponent,
  },
  {
    path: 'visualizareditais',
    component: PageEditalComponent,
  },
  // {
  //   path: 'inscricao',
  //   loadChildren: () =>
  //     import('../inscricao/inscricao.module').then(
  //       (m) => m.InscricaoModule
  //     ),
  //     // canActivate: [LoginGuardService],
  // },
  {
    path: 'perguntas',
    loadChildren: () =>
      import('../pergunta/pergunta.module').then((m) => m.PerguntaModule),
    // canActivate: [LoginGuardService],
  },
];
