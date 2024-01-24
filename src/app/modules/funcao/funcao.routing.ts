import { Routes } from '@angular/router';
import { CreateFuncaoComponent } from 'src/app/features/edital/funcao/create-funcao/create-funcao.component';
import { EditFuncaoComponent } from 'src/app/features/edital/funcao/edit-funcao/edit-funcao.component';
import { FuncaoTableComponent } from 'src/app/features/edital/funcao/funcao-table/funcao-table.component';
import { InfoFuncaoComponent } from 'src/app/features/edital/funcao/info-funcao/info-funcao.component';

export const FuncaoRoutes: Routes = [
  {
    path: ':id',
    component: FuncaoTableComponent,
  },
  {
    path: ':id/register',
    component: CreateFuncaoComponent,
  },
  {
    path: 'info/:id/:idEdital',
    component: InfoFuncaoComponent,
  },
  {
    path: 'edit/:id/:idEdital',
    component: EditFuncaoComponent,
  },
];
