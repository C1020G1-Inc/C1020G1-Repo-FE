import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./authentication/token-storage";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public API_URL = 'http://localhost:8080';
  public httpOptions: any;

  constructor(public httpClient: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public findAccount(accountId: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/find/' + accountId, this.httpOptions);
  }

  public updateEmail(oldEmail: string, newEmail: string): Observable<any> {
    return this.httpClient.put(this.API_URL + '/update-email' + oldEmail, newEmail, this.httpOptions);
  }
}
