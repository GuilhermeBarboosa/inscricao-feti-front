import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { PerguntaRoutes } from './pergunta.routing';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CadastroPerguntasComponent } from 'src/app/features/home/cadastro-perguntas/cadastro-perguntas.component';
import { PerguntaTableComponent } from 'src/app/features/edital/funcao/pergunta/pergunta-table/pergunta-table.component';
import { CreatePerguntaComponent } from 'src/app/features/edital/funcao/pergunta/create-pergunta/create-pergunta.component';
import { EditPerguntaComponent } from 'src/app/features/edital/funcao/pergunta/edit-pergunta/edit-pergunta.component';
import { InfoPerguntaComponent } from 'src/app/features/edital/funcao/pergunta/info-pergunta/info-pergunta.component';
@NgModule({
  declarations: [
    PerguntaTableComponent,
    CadastroPerguntasComponent,
    CreatePerguntaComponent,
    EditPerguntaComponent,
    InfoPerguntaComponent
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
