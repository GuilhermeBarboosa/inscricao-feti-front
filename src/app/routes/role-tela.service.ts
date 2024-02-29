import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { RoleTela } from '../interfaces/dto/roleTela';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleTelaService {
  constructor(private http: HttpClient) {}

  roleTela: RoleTela[] | null = null;
  private roleTelaSubject = new BehaviorSubject<RoleTela[] | null>(null);
  roleTela$: Observable<RoleTela[] | null> =
    this.roleTelaSubject.asObservable();

  initRoleTela() {
    this.getAll().subscribe((data: any) => {
      const roleTelaArray: RoleTela[] = JSON.parse(JSON.stringify(data));
      this.roleTelaSubject.next(roleTelaArray);
      this.roleTela = roleTelaArray; // Atribui o array a roleTela
    });
  }

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getById(id: number) {
    return this.http.get(`${environment.api}/roleTela/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/roleTela`);
  }

  getByRole(id: number){
    return this.http.get(`${environment.api}/roleTela/role/${id}`);
  }

}
