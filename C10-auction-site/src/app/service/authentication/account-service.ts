import { MatExpiredDiaComponent } from './../../module/user/material/mat-expired-dia/mat-expired-dia.component';
import { Account } from 'src/app/model/Account';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Injectable({
    providedIn: 'root'
})
/**
 * @author PhinNL
 */
export class AccountService {
    private options: any;
    private isLogout = false;
    baseURL = 'http://localhost:8080/';
    constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private dialog: MatDialog) {
        this.setOptions();
    }

    setOptions() {
        this.options = {
            // tslint:disable-next-line:object-literal-key-quotes
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
            , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        };
    }

    get httpOptions() {
        if (this.tokenStorage.getTime() && !this.isLogout) {
            if (this.tokenStorage.getTime().getTime() < new Date().getTime()) {
                this.isLogout = true;
                this.logout().subscribe(() => {
                    this.tokenStorage.logOut();
                    this.setOptions();
                    const config = new MatDialogConfig();
                    config.position = { top: '5%' };
                    this.dialog.open(MatExpiredDiaComponent, config);
                });
            }
            this.isLogout = false;
        }
        return this.options;
    }

    logout(): Observable<any> {
        return this.http.put<Observable<any>>(this.baseURL + 'api/account/guest/logout', this.tokenStorage.getAccount(),
            this.httpOptions);
    }

    test(): Observable<any> {
        return this.http.get<Observable<any>>(this.baseURL + 'api/account/member/test', this.httpOptions);
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

    getAllProvince() {
        return this.http.get<any>('https://vapi.vnappmob.com/api/province');
    }

    getAllDistrictByProvince(provinceId: number) {
        return this.http.get<any>('https://vapi.vnappmob.com/api/province/district/' + provinceId);
    }

    getAllWardByDistrict(districtId: number) {
        return this.http.get<any>('https://vapi.vnappmob.com/api/province/ward/' + districtId);
    }
}
