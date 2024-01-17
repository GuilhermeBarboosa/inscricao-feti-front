import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { AlternativaInput } from '../interfaces/input/alternativaInput';

@Injectable({
  providedIn: 'root'
})
export class AlternativaService{


  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlAlternativa = `${environment.api}/alternativa`;

  getById(id: number) {
    return this.http.get(`${this.urlAlternativa}/` + id, {
      headers: this.HttpHeaders,
    });
  }

  create(alternativa: AlternativaInput) {
    return this.http.post(`${this.urlAlternativa}`, alternativa, {
      headers: this.HttpHeaders,
    });
  }

  getAll() {
    return this.http.get(`${this.urlAlternativa}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlAlternativa}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(alternativa: AlternativaInput, id: number) {
    return this.http.put(`${this.urlAlternativa}/${id}`, alternativa, {
      headers: this.HttpHeaders,
    });
  }

  ativar(alternativa: AlternativaInput, id: number) {
    return this.http.put(`${this.urlAlternativa}/ativar/${id}`, alternativa, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlAlternativa}/${id}`, {
      headers: this.HttpHeaders,
    });
  }

  getByIdFuncao(idFuncao: any) {
    return this.http.get(`${this.urlAlternativa}/funcao/${idFuncao}`, {
      headers: this.HttpHeaders,
    });
  }
}
