import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { InscricoesComponent } from 'src/app/features/home/inscricoes/inscricoes.component';
import { SharedModule } from '../shared.module';
import { InscricaoRoutes } from './inscricao.routing';
@NgModule({
  declarations: [
    InscricoesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(InscricaoRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class InscricaoModule {}
