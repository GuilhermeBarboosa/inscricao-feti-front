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
@NgModule({
  declarations: [
    PageEditalComponent,
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
