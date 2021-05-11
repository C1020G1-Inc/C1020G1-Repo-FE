import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage';

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

    recoverPage(accountName: string): Observable<any> {
        return this.http.get(this.baseURL + 'recover/' + accountName);
    }
}
