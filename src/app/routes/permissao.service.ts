import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { PermissaoInput } from '../interfaces/input/permissaoInput';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  create(permissaoInput: PermissaoInput) {
    return this.http.post(`${environment.api}/permissao/`, permissaoInput, {
      headers: this.HttpHeaders,
    });
  }

  edit(permissaoInput: PermissaoInput, id: number) {
    return this.http.put(`${environment.api}/permissao/${id}`, permissaoInput, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}/permissao/${id}`, {
      headers: this.HttpHeaders,
    });
  }

  getById(id: number) {
    return this.http.get(`${environment.api}/permissao/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/permissao`);
  }
}
