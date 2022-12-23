import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperatorElement } from 'src/app/users/operators/operators.component';

const BASE_URL = 'http://localhost:8080/operators'

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor(private http: HttpClient) { }

  get(): Observable<OperatorElement[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.get<OperatorElement[]>(BASE_URL, httpOptions);

  }

  create(body: any) {
    console.log(body);
    return this.http.post(BASE_URL, body);
  }

  delete(id: string) {
    const url = 'http://localhost:8080/operators/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let delUrl = url + id;
    return this.http.delete<OperatorElement>(delUrl, httpOptions);
  }

  getById(id: string) {
    const url = 'http://localhost:8080/operators/';
    return this.http.get<OperatorElement>(`${url}${id}`);
  }

  update(id: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const url = 'http://localhost:8080/operators/';
    return this.http.put<OperatorElement>(`${url}${id}`, body, httpOptions);
  }
}
