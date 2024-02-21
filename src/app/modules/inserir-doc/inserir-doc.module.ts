import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { InserirDocComponent } from 'src/app/features/home/inserir-doc/inserir-doc.component';
import { SharedModule } from '../shared.module';
import { InserirDocRoutes } from './inserir-doc.routing';
@NgModule({
  declarations: [
    InserirDocComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(InserirDocRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class InserirDocModule {}
