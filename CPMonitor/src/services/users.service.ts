import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASE_URL = 'http://localhost:8080/users'

export interface UserElement {
  _id: string; // This alone is not shown in UI. But part of the record.
  position: number;
  name: string;
  joindate: Date;
  email: string;
  role: string

}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  get(): Observable<UserElement[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.get<UserElement[]>(BASE_URL, httpOptions);

  }

  create(body: any) {
    console.log(body);
    //Overrid the userDate with the body data coming in
    const url = 'http://localhost:8080/authusers/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };    
    return this.http.post(url, body);
  
  }

  delete(id: string) {
    const url = 'http://localhost:8080/authusers/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let delUrl = url + id;
    return this.http.delete<UserElement>(delUrl, httpOptions);
  }

  getById(id: string) {
    const url = 'http://localhost:8080/users/';
    return this.http.get<UserElement>(`${url}${id}`);
  }

  update(id: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const url = 'http://localhost:8080/authusers/';
    return this.http.put(`${url}${id}`, body, httpOptions);
  }
}
