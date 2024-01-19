import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { LoginCandidatoComponent } from 'src/app/features/page-login/page-login-candidato/login-candidato/login-candidato.component';
import { RegisterCandidatoComponent } from 'src/app/features/page-login/page-login-candidato/register-candidato/register-candidato.component';
import { SharedModule } from '../shared.module';
import { AuthenticationCandidatoRoutes } from './authentication-candidato.routing';

@NgModule({
  declarations: [LoginCandidatoComponent, RegisterCandidatoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AuthenticationCandidatoRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    ToastrModule.forRoot(),
  ],
})
export class AuthenticationCandidatoModule {}
