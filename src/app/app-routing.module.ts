import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './guards/login-guard.service';
import { RouteInfoService } from './services/route-info.service';
import { AuthenticationRoutes } from './modules/authentication/authentication.routing';
import { EditalRoutes } from './modules/edital/edital.routing';
import { RoleTelaService } from './routes/role-tela.service';
import { RouteData } from './interfaces/input/roteData';
import { AuthGuardService } from './guards/auth-guard.service';

export const routes: Routes = [
  {
    path: 'cms',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [LoginGuardService],
  },
  {
    path: 'login-candidato',
    loadChildren: () =>
      import(
        './modules/authentication-candidato/authentication-candidato.module'
      ).then((m) => m.AuthenticationCandidatoModule),
  },
  {
    path: 'edital',
    loadChildren: () =>
      import('./modules/edital/edital.module').then((m) => m.EditalModule),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'edital',
    } as RouteData,
  },
  {
    path: 'inserirdoc',
    loadChildren: () =>
      import('./modules/inserir-doc/inserir-doc.module').then(
        (m) => m.InserirDocModule
      ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'dashboard',
    } as RouteData,
  },
  {
    path: 'role',
    loadChildren: () =>
      import('./modules/role/role.module').then((m) => m.RoleModule),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },
  {
    path: 'politica',
    loadChildren: () =>
      import('./modules/politica/politica.module').then(
        (m) => m.PoliticaModule
      ),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
    canActivate: [LoginGuardService],
  },
  {
    path: 'minha-conta',
    loadChildren: () =>
      import('./modules/minha-conta/minha-conta.module').then(
        (m) => m.MinhaContaModule
      ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'alternativa',
    loadChildren: () =>
      import('./modules/alternativa/alternativa.module').then(
        (m) => m.AlternativaModule
      ),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'alternativa',
    } as RouteData,
  },
  {
    path: 'minha-inscricao',
    loadChildren: () =>
      import('./modules/minha-inscricao/minha-inscricao.module').then(
        (m) => m.MinhaInscricaoModule
      ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'inscricao',
    loadChildren: () =>
      import('./modules/inscricao/inscricao.module').then(
        (m) => m.InscricaoModule
      ),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'inscricao',
    } as RouteData,
  },
  {
    path: 'pergunta',
    loadChildren: () =>
      import('./modules/pergunta/pergunta.module').then(
        (m) => m.PerguntaModule
      ),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'pergunta',
    } as RouteData,
  },
  {
    path: 'funcao',
    loadChildren: () =>
      import('./modules/funcao/funcao.module').then((m) => m.FuncaoModule),
    canActivate: [LoginGuardService, AuthGuardService],
    data: {
      route_identifier: 'funcao',
    } as RouteData,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
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
export class AppRoutingModule {
  routeIdentifier: string | undefined;

  constructor(private routeIdentifierService: RouteInfoService) {
    routes.forEach((route: any) => {
      if (route.data && route.data.route_identifier) {
        this.routeIdentifierService.setRouteIdentifier(
          route.path || '',
          route.data.route_identifier
        );
      }
    });
  }
}
