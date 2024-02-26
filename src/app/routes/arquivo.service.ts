import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { ArquivoInput } from '../interfaces/input/arquivoInput';

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

  uploadFile(files: File[], responseArquivo: any[], idInscricao: number) {
    const formData: FormData = new FormData();

    responseArquivo.forEach((arquivo, index) => {
      let newFile = new File([files[index]], arquivo.caminho_arquivo, {
        type: files[index].type,
      });
      formData.append('files', newFile);

    });

    return this.http.post(
      `${this.urlArquivo}/uploadFile/${responseArquivo[0].id}/${idInscricao}`,
      formData,
      { responseType: 'blob' }
    );
  }

  getByInscricao(idInscricao: number) {
    return this.http.get(`${this.urlArquivo}/inscricao/` + idInscricao, {
      headers: this.HttpHeaders,
    });
  }

  getFile(idInscricao: number, nome: string) {
    return this.http.get(
      `${this.urlArquivo}/findFile/${idInscricao}/nome/${nome}`,
      { responseType: 'blob' }
    );
  }

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
