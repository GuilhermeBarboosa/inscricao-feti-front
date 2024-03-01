import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { RoleInput } from '../interfaces/input/roleInput';
import { FuncaoInput } from '../interfaces/input/funcaoInput';

@Injectable({
  providedIn: 'root'
})
export class RoleService {



  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  create(roleInput: RoleInput) {
    return this.http.post(`${environment.api}/role/`, roleInput, {
      headers: this.HttpHeaders,
    });
  }

  edit(roleInput: RoleInput, id: number) {
    return this.http.put(`${environment.api}/role/${id}`, roleInput, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}/role/${id}`, {
      headers: this.HttpHeaders,
    });
  }



  getById(id: number) {
    return this.http.get(`${environment.api}/role/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/role`);
  }

}
