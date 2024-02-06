import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { PrivacidadeComponent } from 'src/app/features/politica/privacidade/privacidade.component';
import { TermosDeUsoComponent } from 'src/app/features/politica/termos-de-uso/termos-de-uso.component';
import { PoliticaRoutes } from './politica.routing';
@NgModule({
  declarations: [
    PrivacidadeComponent,
    TermosDeUsoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PoliticaRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class PoliticaModule {}
