import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { EditalInput } from '../interfaces/input/editalInput';

@Injectable({
  providedIn: 'root',
})
export class EditalService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlEdital = `${environment.api}/edital`;

  getById(id: number) {
    return this.http.get(`${this.urlEdital}/` + id, {
      headers: this.HttpHeaders,
    });
  }

  downloadEdital(id: number | undefined) {
    return this.http.get(`${this.urlEdital}/downloadEdital/` + id, {
      responseType: 'blob',
    });
  }

  create(edital: EditalInput) {
    return this.http.post(`${this.urlEdital}`, edital, {
      headers: this.HttpHeaders,
    });
  }

  uploadFile(arquivo: any, id: any) {
    console.log(arquivo);

    let formData = new FormData();
    formData.append('file', arquivo);

    return this.http.post(`${this.urlEdital}/uploadFile/${id}`, formData, {
      responseType: 'blob',
    });
  }

  getAll() {
    return this.http.get(`${this.urlEdital}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlEdital}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(edital: EditalInput, id: number) {
    return this.http.put(`${this.urlEdital}/${id}`, edital, {
      headers: this.HttpHeaders,
    });
  }

  ativar(edital: EditalInput, id: number) {
    return this.http.put(`${this.urlEdital}/ativar/${id}`, edital, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlEdital}/${id}`, {
      headers: this.HttpHeaders,
    });
  }
}
