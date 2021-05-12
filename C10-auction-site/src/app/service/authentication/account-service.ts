import { Account } from 'src/app/model/Account';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage';
import { User } from 'src/app/model/User';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    httpOptions: any;
    baseURL = 'http://localhost:8080/';
    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
        this.httpOptions = {
            // tslint:disable-next-line:object-literal-key-quotes
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
            , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        };
    }

    logout(): Observable<any> {
        return this.http.put<Observable<any>>(this.baseURL + 'api/account/member/logout/' + this.tokenStorage.getAccount().accountId,
         null, this.httpOptions);
    }

    saveAccount(account: Account): Observable<void> {
        return this.http.post<void>(this.baseURL + 'api/account/guest/save', account);
    }

    findAccountNameExist(accountName: string): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/account/guest/exist/name?accountName=' + accountName);
    }

    findEmailExist(email: string): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/account/guest/exist/email?email=' + email);
    }

    findPhoneExist(phone: string): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/user/guest/exist/phone?phone=' + phone);
    }

    findIdentityExist(identity: string): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/user/guest/exist/identity?identity=' + identity);
    }
}
