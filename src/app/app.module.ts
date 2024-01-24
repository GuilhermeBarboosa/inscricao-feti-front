import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroPerguntasComponent } from './features/home/cadastro-perguntas/cadastro-perguntas.component';
import { MinhaInscricaoComponent } from './features/home/minha-inscricao/minha-inscricao.component';
import { LoginCandidatoComponent } from './features/page-login/page-login-candidato/login-candidato/login-candidato.component';
import { RegisterCandidatoComponent } from './features/page-login/page-login-candidato/register-candidato/register-candidato.component';
import { ListInscricoesComponent } from './features/home/list-inscricoes/list-inscricoes.component';
import { EditalTableComponent } from './features/edital/edital-table/edital-table.component';
import { AlternativaTableComponent } from './features/edital/funcao/pergunta/alternativa/alternativa-table/alternativa-table.component';
import { InscricaoTableComponent } from './features/inscricao/inscricao-table/inscricao-table.component';
import { CreateEditalComponent } from './features/edital/create-edital/create-edital.component';
import { InfoEditalComponent } from './features/edital/info-edital/info-edital.component';
import { EditEditalComponent } from './features/edital/edit-edital/edit-edital.component';
import { CreateFuncaoComponent } from './features/edital/funcao/create-funcao/create-funcao.component';
import { InfoFuncaoComponent } from './features/edital/funcao/info-funcao/info-funcao.component';
import { EditFuncaoComponent } from './features/edital/funcao/edit-funcao/edit-funcao.component';
import { CreatePerguntaComponent } from './features/edital/funcao/pergunta/create-pergunta/create-pergunta.component';
import { InfoPerguntaComponent } from './features/edital/funcao/pergunta/info-pergunta/info-pergunta.component';
import { EditPerguntaComponent } from './features/edital/funcao/pergunta/edit-pergunta/edit-pergunta.component';
import { CreateAlternativaComponent } from './features/edital/funcao/pergunta/alternativa/create-alternativa/create-alternativa.component';
import { EditAlternativaComponent } from './features/edital/funcao/pergunta/alternativa/edit-alternativa/edit-alternativa.component';
import { InfoAlternativaComponent } from './features/edital/funcao/pergunta/alternativa/info-alternativa/info-alternativa.component';
import { InfoAllInscricaoComponent } from './features/inscricao/info-all-inscricao/info-all-inscricao.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
