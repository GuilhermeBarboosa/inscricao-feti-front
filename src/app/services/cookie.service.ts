import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  setCookie(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  getCookie(name: string) {
    return localStorage.getItem(name);
  }

  deleteCookie(name: string) {
    localStorage.removeItem(name);
  }
}
