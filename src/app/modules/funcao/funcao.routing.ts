import { Routes } from '@angular/router';
import { CreateFuncaoComponent } from 'src/app/features/edital/funcao/create-funcao/create-funcao.component';
import { EditFuncaoComponent } from 'src/app/features/edital/funcao/edit-funcao/edit-funcao.component';
import { FuncaoTableComponent } from 'src/app/features/edital/funcao/funcao-table/funcao-table.component';
import { InfoFuncaoComponent } from 'src/app/features/edital/funcao/info-funcao/info-funcao.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';
import { roles } from 'src/roles';

export const FuncaoRoutes: Routes = [
  {
    path: ':id',
    component: FuncaoTableComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'funcao',
    } as RouteData,
  },
  {
    path: ':id/register',
    component: CreateFuncaoComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'funcao-register',
    } as RouteData,
  },
  {
    path: 'info/:id/:idEdital',
    component: InfoFuncaoComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'funcao-info',
    } as RouteData,
  },
  {
    path: 'edit/:id/:idEdital',
    component: EditFuncaoComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'funcao-edit',
    } as RouteData,
  },
];
