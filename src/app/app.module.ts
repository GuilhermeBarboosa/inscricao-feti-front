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

@NgModule({
  declarations: [
    AppComponent,
    ListInscricoesComponent
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
