import { Routes } from '@angular/router';
import { CreatePerguntaComponent } from 'src/app/features/edital/funcao/pergunta/create-pergunta/create-pergunta.component';
import { EditPerguntaComponent } from 'src/app/features/edital/funcao/pergunta/edit-pergunta/edit-pergunta.component';
import { InfoPerguntaComponent } from 'src/app/features/edital/funcao/pergunta/info-pergunta/info-pergunta.component';
import { PerguntaTableComponent } from 'src/app/features/edital/funcao/pergunta/pergunta-table/pergunta-table.component';
import { CadastroPerguntasComponent } from 'src/app/features/home/cadastro-perguntas/cadastro-perguntas.component';

import { LoginGuardService } from 'src/app/guards/login-guard.service';

export const PerguntaRoutes: Routes = [
  {
    path: ':idFuncao',
    component: PerguntaTableComponent,
    // canActivate: [LoginGuardService],
  },
  {
    path: 'funcao/:idFuncao',
    component: CadastroPerguntasComponent,
  },
  {
    path: ':idFuncao/register',
    component: CreatePerguntaComponent,
  },
  {
    path: ':idFuncao/edit/:id',
    component: EditPerguntaComponent,
  },
  {
    path: ':idFuncao/info/:id',
    component: InfoPerguntaComponent,
  }
];
