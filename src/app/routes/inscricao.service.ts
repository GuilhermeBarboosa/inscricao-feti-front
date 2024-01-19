import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { InscricaoInput } from '../interfaces/input/inscricaoInput';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService{



  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlInscricao = `${environment.api}/inscricao`;

  getById(id: number) {
    return this.http.get(`${this.urlInscricao}/` + id, {
      headers: this.HttpHeaders,
    });
  }

  create(inscricao: InscricaoInput) {
    console.log(inscricao)
    return this.http.post(`${this.urlInscricao}`, inscricao, {
      headers: this.HttpHeaders,
    });
  }

  getAll() {
    return this.http.get(`${this.urlInscricao}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlInscricao}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(inscricao: InscricaoInput, id: number) {
    return this.http.put(`${this.urlInscricao}/${id}`, inscricao, {
      headers: this.HttpHeaders,
    });
  }

  ativar(inscricao: InscricaoInput, id: number) {
    return this.http.put(`${this.urlInscricao}/ativar/${id}`, inscricao, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlInscricao}/${id}`, {
      headers: this.HttpHeaders,
    });
  }

  getByIdFuncao(idFuncao: any) {
    return this.http.get(`${this.urlInscricao}/funcao/${idFuncao}`, {
      headers: this.HttpHeaders,
    });
  }

  findByInscricaoList(id: number) {
    return this.http.get(`${this.urlInscricao}/all/` + id, {
      headers: this.HttpHeaders,
    });
  }

  getInscricaoWithPerguntas(id: number){
    return this.http.get(`${this.urlInscricao}/infoAll/${id}`, {
      headers: this.HttpHeaders,
    });
  }
}
