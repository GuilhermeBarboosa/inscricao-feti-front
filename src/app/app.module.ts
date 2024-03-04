import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleTelaService } from './routes/role-tela.service';
import { Tela } from './interfaces/dto/tela';
import { TelaService } from './routes/tela.service';

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
  // providers: [StyleService],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private roleTelaService : RoleTelaService, private telaService: TelaService) {
    this.roleTelaService.initRoleTela();
    this.telaService.initTelas();
  }
}
