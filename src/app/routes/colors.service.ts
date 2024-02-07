import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { environment_default } from 'src/environment-default';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) {}

  // HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: 'Bearer ' + localStorage.getItem('token'),
  // });

  getById(id: number) {
    return this.http.get(`${environment_default.api}/cores/` + id);
  }

  getAll() {
    return this.http.get(`${environment_default.api}/cores`);
  }

}
