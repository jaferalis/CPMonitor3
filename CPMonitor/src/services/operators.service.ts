import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperatorElement } from 'src/app/users/operators/operators.component';
import { environment } from './../environments/environment';

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
    return this.http.get<OperatorElement[]>(environment.baseurl + 'operators', httpOptions);

  }

  create(body: any) {
    console.log(body);
    return this.http.post(environment.baseurl + 'operators', body);
  }

  delete(id: string) {
    const url =  environment.baseurl + 'operators/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let delUrl = url + id;
    return this.http.delete<OperatorElement>(delUrl, httpOptions);
  }

  getById(id: string) {
    const url =  environment.baseurl + 'operators/';
    return this.http.get<OperatorElement>(`${url}${id}`);
  }

  update(id: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const url =  environment.baseurl + 'operators/';
    return this.http.put<OperatorElement>(`${url}${id}`, body, httpOptions);
  }
}
