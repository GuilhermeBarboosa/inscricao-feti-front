import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { RoleRoutes } from './role.routing';
import { RolesTableComponent } from 'src/app/features/roles/roles-table/roles-table.component';
import { TableTelasComponent } from 'src/app/features/roles/telas/table-telas/table-telas.component';
import { CreatePermissaoComponent } from 'src/app/features/roles/telas/create-permissao/create-permissao.component';
@NgModule({
  declarations: [
    RolesTableComponent,
    TableTelasComponent,
    CreatePermissaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(RoleRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class RoleModule {}
