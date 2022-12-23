import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeviceElement } from 'src/app/devices/devices.component';
import {FormGroup,FormControl} from '@angular/forms';

const baseUrl = 'http://localhost:8080/';
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
    return this.http.get<DeviceElement[]>('http://localhost:8080/devices',httpOptions);

  }


  startCPUDataMonitoring():Observable<DataResult>{
    const url = 'http://localhost:4203/DataService/Data/Delta';
    const cpuId =  "3cc0968f69b6460981cf5af36f677cb5";

    const body=  '[{"variableId" : "3cc0968f69b6460981cf5af36f677cb5"},{"variableId": "fd29e7aa445a4fcdb385f95328da9dbe" }]';
    return this.http.post<DataResult>(url,body);   

  }

  createDevice(body:any){
    const url = 'http://localhost:8080/devices';
    console.log(body);
    return this.http.post(url,body);
  }

  deleteDevice(id: string){
    const url = 'http://localhost:8080/devices/';
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
  };
    let delUrl = url + id;
    return this.http.delete<DeviceElement>(delUrl, httpOptions);
  }

  getById(id: string) {
    const url = 'http://localhost:8080/devices/';
    return this.http.get<DeviceElement>(`${url}${id}`);
}

updateDevice(id: string,body:any){
  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
};
  const url = 'http://localhost:8080/devices/';
  return this.http.put<DeviceElement>(`${url}${id}`,body,httpOptions);
}

}
