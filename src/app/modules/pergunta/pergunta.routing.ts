import { Routes } from '@angular/router';
import { CadastroPerguntasComponent } from 'src/app/features/home/cadastro-perguntas/cadastro-perguntas.component';
import { PerguntaTableComponent } from 'src/app/features/pergunta/pergunta-table/pergunta-table.component';
import { LoginGuardService } from 'src/app/guards/login-guard.service';

export const PerguntaRoutes: Routes = [
  {
    path: '',
    component: PerguntaTableComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'funcao/:idFuncao',
    component: CadastroPerguntasComponent,
  },
];
