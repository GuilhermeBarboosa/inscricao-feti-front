import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { PageEditalComponent } from 'src/app/features/home/page-edital/page-edital.component';
import { SharedModule } from '../shared.module';
import { EditalRoutes } from './edital.routing';
import { EditalTableComponent } from 'src/app/features/edital/edital-table/edital-table.component';
import { CreateEditalComponent } from 'src/app/features/edital/create-edital/create-edital.component';
import { InfoEditalComponent } from 'src/app/features/edital/info-edital/info-edital.component';
import { EditEditalComponent } from 'src/app/features/edital/edit-edital/edit-edital.component';
@NgModule({
  declarations: [
    PageEditalComponent,
    EditalTableComponent,
    CreateEditalComponent,
    InfoEditalComponent,
    EditEditalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EditalRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class EditalModule {}
