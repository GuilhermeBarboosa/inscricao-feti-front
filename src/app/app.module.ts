import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleService } from './services/style.service';
import { RoleTelaService } from './routes/role-tela.service';
import { CreatePermissaoComponent } from './features/roles/telas/create-permissao/create-permissao.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [StyleService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private RoleTelaService : RoleTelaService) {
    this.RoleTelaService.initRoleTela();

  }
}
