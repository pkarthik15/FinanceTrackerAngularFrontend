import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import {LoginModel} from  '../models/login'
import { RegisterModel } from '../models/register';

const httpHeaderOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

const login_url = `${environment.api_base_uri}/auth/login`;
const register_url = `${environment.api_base_uri}/auth/signup`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(req:LoginModel): Observable<any> {
      return this.http.post(
        login_url,
        JSON.stringify(req),
        httpHeaderOptions
      );
  }


  register(req:RegisterModel): Observable<any>{
    return this.http.post(
      register_url,
      JSON.stringify(req),
      httpHeaderOptions
    );
  }





}
