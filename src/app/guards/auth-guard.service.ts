import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../routes/login.service';
import { NotifierService } from '../services/notifier.service';
import { TokenJwtService } from '../services/token-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private loginService: LoginService,
    private notifier: NotifierService,
    private token: TokenJwtService
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
      const roleJson = JSON.parse(JSON.stringify(route.data));
      let roleArray = roleJson.rolesArray;
      let permission = false;

      roleArray.forEach((element: any) => {
        if (element.role == userRole) {
          permission = true;
        }
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
