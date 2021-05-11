import { AccountService } from './authentication/account-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './authentication/token-storage';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    httpOptions: any;
    baseURL = 'http://localhost:8080/';
    constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private accountService: AccountService) {
        this.httpOptions = accountService.httpOptions;
    }

    requestAdmin(): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/account/admin', this.httpOptions);
    }

    requestMember(): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/account/member', this.httpOptions);
    }

    requestGuest(): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/account/guest', this.httpOptions);
    }
}
