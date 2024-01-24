import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AlternativaTableComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/alternativa-table/alternativa-table.component';
import { SharedModule } from '../shared.module';
import { AlternativaRoutes } from './alternativa.routing';
import { Alternativa } from '../../interfaces/dto/alternativa';
import { CreateAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/create-alternativa/create-alternativa.component';
import { EditAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/edit-alternativa/edit-alternativa.component';
import { InfoAlternativaComponent } from 'src/app/features/edital/funcao/pergunta/alternativa/info-alternativa/info-alternativa.component';
@NgModule({
  declarations: [
   AlternativaTableComponent,
   CreateAlternativaComponent,
   EditAlternativaComponent,
   InfoAlternativaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AlternativaRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class AlternativaModule {}
