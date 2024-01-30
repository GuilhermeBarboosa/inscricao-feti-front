import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { InicioComponent } from 'src/app/features/home/inicio/inicio.component';
import { SharedModule } from '../shared.module';
import { MinhaContaRoutes } from './minha-conta.routing';
import { MinhaContaComponent } from 'src/app/features/home/minha-conta/minha-conta.component';
@NgModule({
  declarations: [
    MinhaContaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MinhaContaRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class MinhaContaModule {}
