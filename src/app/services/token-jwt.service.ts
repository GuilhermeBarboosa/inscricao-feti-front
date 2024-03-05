import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/routes/login.service';
@Injectable({
  providedIn: 'root',
})
export class TokenJwtService {
  constructor(private loginService: LoginService) {}

  setToken(login: any) {
    localStorage.setItem('token', login.token);
    localStorage.setItem('email', login.email);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.role);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getIdRole(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.idRole);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getIdUser() : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.id);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
