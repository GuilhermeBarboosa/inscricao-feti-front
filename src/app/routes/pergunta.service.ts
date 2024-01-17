import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { PerguntaInput } from '../interfaces/input/perguntaInput';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlPergunta = `${environment.api}/pergunta`;

  getById(id: number) {
    return this.http.get(`${this.urlPergunta}/` + id, {
      headers: this.HttpHeaders,
    });
  }


  create(user: PerguntaInput) {
    return this.http.post(`${this.urlPergunta}`, user, {
      headers: this.HttpHeaders,
    });
  }

  getAll() {
    return this.http.get(`${this.urlPergunta}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlPergunta}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(user: PerguntaInput, id: number) {
    return this.http.put(`${this.urlPergunta}/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  ativar(user: PerguntaInput, id: number) {
    return this.http.put(`${this.urlPergunta}/ativar/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlPergunta}/${id}`, {
      headers: this.HttpHeaders,
    });
  }
}
