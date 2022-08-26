import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountModel } from '../models/account';
import { AccountRead } from '../models/accountRead';



const httpHeaderOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

const account_url = `${environment.api_base_uri}/account`;




@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(
      account_url    
    );
  }

  createAccount(req:AccountModel): Observable<any> {
    return this.http.post(
      account_url,
      JSON.stringify(req),
      httpHeaderOptions
    );
  }


  updateAccount(req:AccountRead): Observable<any>{
    return this.http.patch(
      account_url + "/" + req.id,
      JSON.stringify({name:req.name}),
      httpHeaderOptions
    );
  }


  deleteAccount(req:AccountRead): Observable<any>{
    return this.http.delete(
      account_url + "/" + req.id
    );
  }


}
