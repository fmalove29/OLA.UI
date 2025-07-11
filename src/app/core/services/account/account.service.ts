import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEndpoints } from '../../../AppEndpoints';
import { Account, AccountParams, AccountResponse } from '../../../models/Account/Account';
import { Observable } from 'rxjs';
import { PagedResponse } from '../../../models/common/PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  getAccounts(account: AccountParams): Observable<PagedResponse<Account>> {
    let params = new HttpParams();
  
    for (let key in account) {
      const value = account[key as keyof AccountParams];
  
      if (value != null && value !== '') {
        params = params.set(key, value.toString());
      }
    }
  
    return this.http.get<PagedResponse<Account>>(AppEndpoints.Account.GetAccounts, { params });
  }
}
