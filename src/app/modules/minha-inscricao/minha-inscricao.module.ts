import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { MinhaInscricaoComponent } from 'src/app/features/home/minha-inscricao/minha-inscricao.component';
import { SharedModule } from '../shared.module';
import { MinhaInscricaoRoutes } from './minhas-inscricao.routing';
@NgModule({
  declarations: [MinhaInscricaoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MinhaInscricaoRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class MinhaInscricaoModule {}
