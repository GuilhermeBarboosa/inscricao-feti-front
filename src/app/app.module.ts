import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditInscricaoComponent } from './features/inscricao/edit-inscricao/edit-inscricao.component';
import { FooterComponent } from './components/footer/footer.component';
import { TermosDeUsoComponent } from './features/politica/termos-de-uso/termos-de-uso.component';
import { saveAs } from 'file-saver';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { NotifierService } from './services/notifier.service';
import { ColorsService } from './routes/colors.service';
import { CookieService } from './services/cookie.service';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private colorsService: ColorsService
  ) {
    this.colorsService.getAll().subscribe((data: any) => {
      var response = JSON.parse(JSON.stringify(data));
      response.forEach((element: any) => {
        localStorage.setItem(`${element.tipo}`, element.cor);
      });
    });
  }

}
