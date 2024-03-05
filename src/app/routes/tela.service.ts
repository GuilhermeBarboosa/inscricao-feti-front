import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class TelaService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getById(id: number) {
    return this.http.get(`${environment.api}/tela/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/tela`);
  }

  telasVariablesSubject = new BehaviorSubject<any[]>([]);
  telasVariables$ = this.telasVariablesSubject.asObservable();
  telasAll: { [key: string]: string } = {};
  telaAdmin: any = null

  initTelas() {
    this.getAll().subscribe(
      (data: any) => {
        const response = JSON.parse(JSON.stringify(data));
        const telasVariables: any = [];
        this.telaAdmin = response;

        console.log(response);

        response.forEach((element: any) => {
          const key = element.identificador.toUpperCase().replaceAll('-', '_');
          this.telasAll[key] = element.identificador;
          telasVariables.push(element);
        });

        this.telasVariablesSubject.next(telasVariables);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
