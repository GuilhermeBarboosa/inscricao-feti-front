import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../routes/login.service';
import { NotifierService } from '../services/notifier.service';
import { TokenJwtService } from '../services/token-jwt.service';
import { RoleTelaService } from '../routes/role-tela.service';
import { roles } from 'src/roles';
import { PermissionsGuardService } from './permissions-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private loginService: LoginService,
    private notifier: NotifierService,
    private token: TokenJwtService,
    private roleTelaService: RoleTelaService,
    private permissions: PermissionsGuardService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  async checkUserLogin(
    route: ActivatedRouteSnapshot,
    url: any
  ): Promise<boolean> {
    if (this.loginService.verifyToken()) {
      let userRole = await this.token.getRole();
      let permission = false;

      if(userRole === roles.ROLE_ADMIN){
        permission = true;
      }

      this.roleTelaService.roleTela$.subscribe((res) => {
        res?.forEach((roleTela) => {
          if (roleTela.identificador === route.data['route_identifier']) {
            if (roleTela.role === userRole) {
              this.permissions.setPermissions(roleTela);
              permission = true;
            }
          }
        });
      });

      if (!permission) {
        this.notifier.showError(
          'Você não tem permissão para acessar essa página'
        );
        window.history.back();
        return false;
      }

      return true;
    } else {
      this.loginService.logout();
      return false;
    }
  }
}
