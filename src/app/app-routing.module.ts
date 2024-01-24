
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './guards/login-guard.service';

export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'login-candidato',
    loadChildren: () =>
      import('./modules/authentication-candidato/authentication-candidato.module').then(
        (m) => m.AuthenticationCandidatoModule
      ),
  },
  {
    path: 'edital',
    loadChildren: () =>
      import('./modules/edital/edital.module').then(
        (m) => m.EditalModule
      ),
      // canActivate: [LoginGuardService],
  },
  {
    path: 'alternativa',
    loadChildren: () =>
      import('./modules/alternativa/alternativa.module').then(
        (m) => m.AlternativaModule
      ),
      // canActivate: [LoginGuardService],
  },
  {
    path: 'minha-inscricao',
    loadChildren: () =>
      import('./modules/minha-inscricao/minha-inscricao.module').then(
        (m) => m.MinhaInscricaoModule
      ),
      // canActivate: [LoginGuardService],
  },
  {
    path: 'inscricao',
    loadChildren: () =>
      import('./modules/inscricao/inscricao.module').then(
        (m) => m.InscricaoModule
      ),
      // canActivate: [LoginGuardService],
  },
  {
    path: 'user',
    loadChildren: () =>
    import('./modules/user/user.module').then(
      (m) => m.UserModule
    ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'pergunta',
    loadChildren: () =>
    import('./modules/pergunta/pergunta.module').then(
      (m) => m.PerguntaModule
    ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'funcao',
    loadChildren: () =>
    import('./modules/funcao/funcao.module').then(
      (m) => m.FuncaoModule
    ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'profile',
    loadChildren: () =>
    import('./modules/profile/profile.module').then(
      (m) => m.ProfileModule
    ),
    canActivate: [LoginGuardService],
  },
  {
    path: '',
    redirectTo: 'login-candidato/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
