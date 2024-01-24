import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FuncaoRoutes } from './funcao.routing';
import { FuncaoTableComponent } from 'src/app/features/edital/funcao/funcao-table/funcao-table.component';
import { CreateFuncaoComponent } from 'src/app/features/edital/funcao/create-funcao/create-funcao.component';
import { InfoFuncaoComponent } from 'src/app/features/edital/funcao/info-funcao/info-funcao.component';
import { EditFuncaoComponent } from 'src/app/features/edital/funcao/edit-funcao/edit-funcao.component';

@NgModule({
  declarations: [
    FuncaoTableComponent,
    CreateFuncaoComponent,
    InfoFuncaoComponent,
    EditFuncaoComponent
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
