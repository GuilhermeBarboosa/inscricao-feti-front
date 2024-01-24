import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { FuncaoInput } from '../interfaces/input/funcaoInput';
import { VerifyInput } from '../interfaces/input/verifyInput';

@Injectable({
  providedIn: 'root',
})
export class FuncaoService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlFuncao = `${environment.api}/funcao`;

  getById(id: number) {
    return this.http.get(`${this.urlFuncao}/` + id, {
      headers: this.HttpHeaders,
    });
  }

  getByIdEdital(idEdital: any) {
    return this.http.get(`${this.urlFuncao}/edital/${idEdital}`, {
      headers: this.HttpHeaders,
    });
  }

  getVerifyInscricao(verifyInput: VerifyInput) {
    return this.http.post(`${this.urlFuncao}/verifyInscricao/`, verifyInput, {
      headers: this.HttpHeaders,
    });
  }

  create(user: FuncaoInput) {
    return this.http.post(`${this.urlFuncao}`, user, {
      headers: this.HttpHeaders,
    });
  }

  getAll() {
    return this.http.get(`${this.urlFuncao}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlFuncao}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(user: FuncaoInput, id: number) {
    return this.http.put(`${this.urlFuncao}/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  ativar(user: FuncaoInput, id: number) {
    return this.http.put(`${this.urlFuncao}/ativar/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlFuncao}/${id}`, {
      headers: this.HttpHeaders,
    });
  }

}
