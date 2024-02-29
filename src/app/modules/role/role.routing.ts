import { Routes } from '@angular/router';
import { RolesTableComponent } from 'src/app/features/roles/roles-table/roles-table.component';
import { CreatePermissaoComponent } from 'src/app/features/roles/telas/create-permissao/create-permissao.component';
import { TableTelasComponent } from 'src/app/features/roles/telas/table-telas/table-telas.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';

export const RoleRoutes: Routes = [
  {
    path: '',
    component: RolesTableComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'roles', // Adicione um identificador único para a rota
    } as RouteData,
  },
  {
    path: 'telas/:id',
    component: TableTelasComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role_tela', // Adicione um identificador único para a rota
    } as RouteData,
  },
  {
    path: 'telas/:id/register',
    component: CreatePermissaoComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role_tela', // Adicione um identificador único para a rota
    } as RouteData,
  },

];
