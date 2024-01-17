import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FuncaoTableComponent } from '../../features/funcao/funcao-table/funcao-table.component';
import { FuncaoRoutes } from './funcao.routing';

@NgModule({
  declarations: [
    FuncaoTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FuncaoRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class FuncaoModule {}
