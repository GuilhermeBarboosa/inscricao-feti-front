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

  create(pergunta: PerguntaInput) {
    return this.http.post(`${this.urlPergunta}`, pergunta, {
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

  edit(pergunta: PerguntaInput, id: number) {
    return this.http.put(`${this.urlPergunta}/${id}`, pergunta, {
      headers: this.HttpHeaders,
    });
  }

  ativar(pergunta: PerguntaInput, id: number) {
    return this.http.put(`${this.urlPergunta}/ativar/${id}`, pergunta, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlPergunta}/${id}`, {
      headers: this.HttpHeaders,
    });
  }

  getIdPerguntaByFuncao(id: number) {
    return this.http.get(`${this.urlPergunta}/funcao/` + id, {
      headers: this.HttpHeaders,
    });
  }

}
