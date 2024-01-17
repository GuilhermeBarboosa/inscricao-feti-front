import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { PerguntaRoutes } from './pergunta.routing';
import { PerguntaTableComponent } from '../../features/pergunta/pergunta-table/pergunta-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CadastroPerguntasComponent } from 'src/app/features/home/cadastro-perguntas/cadastro-perguntas.component';
@NgModule({
  declarations: [
    PerguntaTableComponent,
    CadastroPerguntasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PerguntaRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class PerguntaModule {}
