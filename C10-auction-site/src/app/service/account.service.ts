import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public API_URL = 'http://localhost:8080/api/account';

  constructor(public httpClient: HttpClient) {}

  public findAccount(accountId: number): Observable<any>{
    return this.httpClient.get(this.API_URL + '/find/' + accountId);
  }

  public updateEmail(oldEmail: string, newEmail: string): Observable<any> {
    return this.httpClient.put(this.API_URL + '/update-email' + oldEmail, newEmail);
  }
}
