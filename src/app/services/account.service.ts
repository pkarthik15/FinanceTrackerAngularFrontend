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

  getAccounts(): Observable<AccountRead[]> {
    return this.http.get<AccountRead[]>(account_url);
  }

  createAccount(req:AccountModel): Observable<AccountRead> {
    return this.http.post<AccountRead>(
      account_url,
      JSON.stringify(req),
      httpHeaderOptions
    );
  }

  updateAccount(req:AccountRead): Observable<AccountRead>{
    return this.http.patch<AccountRead>(
      account_url + "/" + req._id,
      JSON.stringify({name:req.name}),
      httpHeaderOptions
    );
  }

  deleteAccount(req:AccountRead): Observable<AccountRead>{
    console.log(req);
    return this.http.delete<AccountRead>(
      account_url + "/" + req._id
    );
  }


}
