import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MachineElement } from 'src/app/users/machines/machines.component';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  constructor(private http: HttpClient) { }
  get(): Observable<MachineElement[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.get<MachineElement[]>(environment.baseurl + 'machines', httpOptions);

  }

  create(body: any) {
    console.log(body);
    return this.http.post(environment.baseurl + 'machines', body);
  }

  delete(id: string) {
    const url = environment.baseurl + 'machines/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let delUrl = url + id;
    return this.http.delete<MachineElement>(delUrl, httpOptions);
  }

  getById(id: string) {
    const url = environment.baseurl + 'machines/';
    return this.http.get<MachineElement>(`${url}${id}`);
  }

  update(id: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const url = environment.baseurl + 'machines/';
    return this.http.put<MachineElement>(`${url}${id}`, body, httpOptions);
  }  
}
