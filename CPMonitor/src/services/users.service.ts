import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';


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
    return this.http.get<UserElement[]>(environment.baseurl + 'users', httpOptions);

  }

  create(body: any) {
    console.log(body);
    //Overrid the userDate with the body data coming in
    const url =  environment.baseurl + 'authusers/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };    
    return this.http.post(url, body);
  
  }

  delete(id: string) {
    const url =  environment.baseurl + 'authusers/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let delUrl = url + id;
    return this.http.delete<UserElement>(delUrl, httpOptions);
  }

  getById(id: string) {
    const url =  environment.baseurl + 'users/';
    return this.http.get<UserElement>(`${url}${id}`);
  }

  update(id: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const url = environment.baseurl + 'authusers/';
    return this.http.put(`${url}${id}`, body, httpOptions);
  }
}
