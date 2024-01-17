import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PerguntaWithAlternativaService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlPerguntaWithAlternativa = `${environment.api}/perguntaWithAlternativa`;

  getPerguntaWithAlternativa(idFuncao: number) {
    return this.http.get(`${this.urlPerguntaWithAlternativa}/${idFuncao}`, {
      headers: this.HttpHeaders,
    });
  }

}
