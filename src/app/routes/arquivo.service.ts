import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { EditalInput } from '../interfaces/input/editalInput';
import { ArquivoInput } from '../interfaces/input/arquivoInput';
import { Arquivo } from '../interfaces/dto/arquivo';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlArquivo = `${environment.api}/arquivo_inscricao`;

  // getById(id: number) {
  //   return this.http.get(`${this.urlArquivo}/` + id, {
  //     headers: this.HttpHeaders,
  //   });
  // }

  // downloadEdital(id: number | undefined) {
  //   return this.http.get(`${this.urlArquivo}/downloadEdital/` + id, {
  //     responseType: 'blob',
  //   });
  // }

  create(arquivo: ArquivoInput[]) {
    return this.http.post(`${this.urlArquivo}`, arquivo, {
      headers: this.HttpHeaders,
    });
  }

  uploadFile(files: File[], responseArquivo: Arquivo[], idInscricao: number) {
    const formData: FormData = new FormData();

    files.forEach((file, index) => {
      responseArquivo.forEach((arquivo) => {
        let newFile = new File([file], arquivo.caminho_arquivo, {
          type: file.type,
        });
        formData.append('files', newFile);
      });
    });

    return this.http.post(
      `${this.urlArquivo}/uploadFile/${responseArquivo[0].id}/${idInscricao}`,
      formData,
      { responseType: 'blob' }
    );
  }

  // getAll() {
  //   return this.http.get(`${this.urlArquivo}`, { headers: this.HttpHeaders });
  // }

  // getAllInativo() {
  //   return this.http.get(`${this.urlArquivo}/desativado`, {
  //     headers: this.HttpHeaders,
  //   });
  // }

  // edit(edital: EditalInput, id: number) {
  //   return this.http.put(`${this.urlArquivo}/${id}`, edital, {
  //     headers: this.HttpHeaders,
  //   });
  // }

  // ativar(edital: EditalInput, id: number) {
  //   return this.http.put(`${this.urlArquivo}/ativar/${id}`, edital, {
  //     headers: this.HttpHeaders,
  //   });
  // }

  // delete(id: number) {
  //   return this.http.delete(`${this.urlArquivo}/${id}`, {
  //     headers: this.HttpHeaders,
  //   });
  // }
}
