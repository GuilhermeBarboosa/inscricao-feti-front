import { Routes } from '@angular/router';
import { CreatePerguntaComponent } from 'src/app/features/edital/funcao/pergunta/create-pergunta/create-pergunta.component';
import { EditPerguntaComponent } from 'src/app/features/edital/funcao/pergunta/edit-pergunta/edit-pergunta.component';
import { InfoPerguntaComponent } from 'src/app/features/edital/funcao/pergunta/info-pergunta/info-pergunta.component';
import { PerguntaTableComponent } from 'src/app/features/edital/funcao/pergunta/pergunta-table/pergunta-table.component';
import { CadastroPerguntasComponent } from 'src/app/features/home/cadastro-perguntas/cadastro-perguntas.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

import { LoginGuardService } from 'src/app/guards/login-guard.service';
import { roles } from 'src/roles';

export const PerguntaRoutes: Routes = [
  {
    path: ':idFuncao',
    component: PerguntaTableComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesArray:[
         {
          role: roles.ROLE_ADMIN
         },
         {
          role: roles.ROLE_SECRETARIO
         }
      ]
    },
  },
  {
    path: 'funcao/:idFuncao',
    component: CadastroPerguntasComponent,
    // canActivate: [AuthGuardService],
    // data: {
    //   rolesArray:[
    //      {
    //       role: roles.ROLE_ADMIN
    //      },
    //      {
    //       role: roles.ROLE_SECRETARIO
    //      }
    //   ]
    // },
  },
  {
    path: ':idFuncao/register',
    component: CreatePerguntaComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesArray:[
         {
          role: roles.ROLE_ADMIN
         },
         {
          role: roles.ROLE_SECRETARIO
         }
      ]
    },
  },
  {
    path: ':idFuncao/edit/:id',
    component: EditPerguntaComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesArray:[
         {
          role: roles.ROLE_ADMIN
         },
         {
          role: roles.ROLE_SECRETARIO
         }
      ]
    },
  },
  {
    path: ':idFuncao/info/:id',
    component: InfoPerguntaComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesArray:[
         {
          role: roles.ROLE_ADMIN
         },
         {
          role: roles.ROLE_SECRETARIO
         }
      ]
    },
  }
];
