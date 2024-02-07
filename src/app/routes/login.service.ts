import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { LoginInput } from '../interfaces/input/loginInput';
import { NotifierService } from '../services/notifier.service';
import { TokenJwtService } from '../services/token-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notifier: NotifierService
  ) {}

  login(login: LoginInput) {
    return this.http.post(`${environment.api}/auth/login`, login);
  }

  verifyToken() {
    return this.http.post(
      `${environment.api}/auth/verifyToken`,
      localStorage.getItem('token')
    );
  }

  obterClaims() {
    return this.http.post(
      `${environment.api}/auth/obterClaims`,
      localStorage.getItem('token')
    );
  }

  isLogin() {
    this.verifyToken().subscribe(
      (res) => {},
      (err) => {
        this.logout();
      }
    );

    if (localStorage.getItem('token') != null) {
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    this.notifier.showInfo('Você não está logado');
    this.router.navigate(['/login-candidato/login/']);
  }

}
