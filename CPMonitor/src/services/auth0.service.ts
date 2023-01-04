import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  domain: 'serverlessjaf.auth0.com',
  clientId: '3LTMUjQpdjHs2urxEVJ90jhxIuGUNXgG',  // API Explorer M2M application
  clientSecret: 'kg8bADadqUk8XeuHeHMpFiNlWpy2Jx8ksTD50eDzoNsVnR9c3JikEomOctXcJZMV',
  scope: "read:users create:users delete:users",
  audience: 'https://serverlessjaf.auth0.com/api/v2/',
  tokenProvider: {
    enableCache: true,
    cacheTTLInSeconds: 10
  }
});

var userData = {
  "connection": "Username-Password-Authentication",
  "email": "abc@hotmail.com",
  "name": "ghi",
  "password": "secret",
  "email_verified": true,
  "verify_email": true
}


@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor() { }

  createUser(userData: any): Observable<any> {
    let userResp: any;
    auth0.createUser(userData)
      .then(function (user: any) {
        userResp = user;
      })
      .catch(function (err: any) {
        console.log(err);
      });
    return userResp;
  }

  updateUser(id: string, body: any): Observable<any> {
    let updateData = {
      "connection": "Username-Password-Authentication",
      "name": "ghi",
    };
    let userResp: any;
    updateData.name = body.name;
    auth0.updateUser({ id: id }, updateData)
      .then(function (user: any) {
        userResp = user;
      })
      .catch(function (err: any) {
        console.log(err);
      });
    return userResp;
  }

  deleteUser(id: string): Observable<any> {
    const userid = '63992192815c1303759569d1'
    var res:any = false;
    auth0.deleteUser({ id: id })
      .then(function (user:any) {
        res = true;
      })
      .catch(function (err:any) {

      });
      return res;
  }

}
