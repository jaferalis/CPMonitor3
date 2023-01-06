import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { string } from 'joi';


export interface UserElement {
  _id: number; // This alone is not shown in UI. But part of the record.
  name: string;
  email: string;
  role: string

}



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  role: string="";
  isManager: boolean= false;
  
  constructor(private http: HttpClient) { }

  get(email?:string): Observable<UserElement[]> {
    var url = environment.baseurl + 'authuser/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    if (email === undefined || email === null) {
     // do nothing
     return this.http.get<UserElement[]>(url, httpOptions);
    }
    else{
      url = url + "?email=" + email;
      console.log("url with email:" + url);
      return this.http.get<UserElement[]>(url, httpOptions);
    }

  //  return this.http.get<UserElement[]>(url, httpOptions);

  }

  create(body: any) {
    console.log(body);
    //Overrid the userDate with the body data coming in
    const url =  environment.baseurl + 'authuser/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };    
    return this.http.post(url, body);
  
  }

  delete(id: any) {
    const url =  environment.baseurl + 'authuser/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let delUrl = url + id;
    return this.http.delete<UserElement>(delUrl, httpOptions);
  }

  getById(id: any) {
    const url =  environment.baseurl + 'authuser/';
    return this.http.get<UserElement>(`${url}${id}`);
  }

  update(id: any, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const url = environment.baseurl + 'authuser/';
    return this.http.put(`${url}${id}`, body, httpOptions);
  }

  setRole(role:string){
    this.role = role;
    if (this.role === "Manager"){
      this.isManager = true;
    }
    else
    {
      this.isManager = false;
    }
  }

  getRole(): string{
    return this.role;
  }

  isRoleManager():boolean{
    return this.isManager
  }
}
