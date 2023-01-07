import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeviceElement } from 'src/app/devices/devices.component';
import {FormGroup,FormControl} from '@angular/forms';
import { environment } from './../environments/environment';


interface value {
  timestamp: string;
  value: string | number | boolean;
  qualitycode?: number;
}

interface PlcData {
  variableId: string;
  values: value[];
  lastRequestTime?: string;
}

interface DataResult {
  data: PlcData[];
  hasMoreData?: {
      from: string;
      to: string;
  }
}

@Injectable({
  providedIn: 'root'
})


export class DevicesService {

  constructor(private http: HttpClient) { }
  
  getDevices(): Observable<DeviceElement[]>{

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    } 
    return this.http.get<DeviceElement[]>(environment.baseurl + 'devices',httpOptions);

  }

  createDevice(body:any){
    const url =  environment.baseurl + 'devices';
    console.log(body);
    return this.http.post(url,body);
  }

  deleteDevice(id: number){
    const url = environment.baseurl + 'devices/';
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
  };
    let delUrl = url + id;
    return this.http.delete<DeviceElement>(delUrl, httpOptions);
  }

  getById(id: number) {
    const url = environment.baseurl + 'devices/';
    return this.http.get<DeviceElement>(`${url}${id}`);
}

updateDevice(id: number,body:any){
  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
};
  const url =  environment.baseurl + 'devices/';
  return this.http.put<DeviceElement>(`${url}${id}`,body,httpOptions);
}

getCount():Observable<any>{
  const url = environment.baseurl + 'devices/count/count';
  // this.http.get<{ count: number }>(url).subscribe(data => {
  //   alert("from getcount in angu service:"  + data);
  //   this.count = data.count;
  // });
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }
  return this.http.get<{count: number}>(url, httpOptions);
}

}
