import {Router} from '@angular/router';
import {Account} from './../../model/Account';
import {JwtResponse} from './JwtRespone';
import {Injectable} from '@angular/core';
import {AccountVisitor} from '../../model/temporary/account';

const TOKEN_KEY = 'X4dr1vOeejA9pWEc7VuF';
const ACCOUNT_KEY = 'SCisnPM9Obi0JnEGBTtK';
const ROLES_KEY = 'pPpPFvvv5ax291ETMe38';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
    constructor(private router: Router) { }

    logOut() {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }

    public saveTimeTokenLocal() {
        const date = new Date(new Date().getTime() + (((24 * 60 * 60) - 30) * 1000));
        window.localStorage.setItem('time', JSON.stringify(date.toJSON()));
    }

    public saveTimeTokenSession() {
        const date = new Date(new Date().getTime() + (((24 * 60 * 60) - 30) * 1000));
        window.sessionStorage.setItem('time', JSON.stringify(date.toJSON()));
    }

    public getTime(): Date {
        if (localStorage.getItem(TOKEN_KEY) !== null){
            return new Date(JSON.parse(window.localStorage.getItem('time')));
        }
        return new Date(JSON.parse(window.sessionStorage.getItem('time')));
    }

    public saveData(data: JwtResponse, remmember: boolean) {
        this.logOut();
        if (remmember) {
            this.saveTimeTokenLocal();
            this.saveTokenStorage(data.jwtToken);
            this.saveAccountStorage(data.account);
            this.saveRolesStorage(data.roles);
        } else {
            this.saveTimeTokenSession();
            this.saveTokenSession(data.jwtToken);
            this.saveAccountSession(data.account);
            this.saveRolesSession(data.roles);
        }
    }

    public saveTokenSession(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public saveTokenStorage(token: string) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    public saveRolesSession(roles: string[]) {
        window.sessionStorage.removeItem(ROLES_KEY);
        window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
    }

    public saveRolesStorage(roles: string[]) {
        window.localStorage.removeItem(ROLES_KEY);
        window.localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
    }

    public getToken(): string {
        if (this.isRemember()) {
            return localStorage.getItem(TOKEN_KEY);
        }
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public getRoles(): string[] {
        if (window.localStorage.getItem(ROLES_KEY) != null) {
            return JSON.parse(localStorage.getItem(ROLES_KEY));
        }
        return JSON.parse(sessionStorage.getItem(ROLES_KEY));
    }

    public getAccount(): Account {
        if (window.localStorage.getItem(ACCOUNT_KEY) != null) {
            return JSON.parse(window.localStorage.getItem(ACCOUNT_KEY));
        }
        return JSON.parse(window.sessionStorage.getItem(ACCOUNT_KEY));
    }

    public isLogged(): boolean {
        return !(window.sessionStorage.getItem(TOKEN_KEY) == null && window.localStorage.getItem(TOKEN_KEY) == null);
    }

    public isRemember(): boolean {
        return window.localStorage.getItem(TOKEN_KEY) != null;
    }

    public saveAccountStorage(account: Account) {
        window.localStorage.removeItem(ACCOUNT_KEY);
        window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    }

    public saveAccountSession(account: Account) {
        window.sessionStorage.removeItem(ACCOUNT_KEY);
        window.sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    }

  /**
   * Author: DuongLQ
   */
  public removeAccount() {
    window.sessionStorage.removeItem(ACCOUNT_KEY);
  }

  /**
   * Author: DuongLQ
   */
  public saveAccountVisitorSession(account: AccountVisitor) {
    window.sessionStorage.removeItem(ACCOUNT_KEY);
    window.sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }

  /**
   * Author: DuongLQ
   */
  public getAccountVisitor(): AccountVisitor {
    if (window.localStorage.getItem(ACCOUNT_KEY) != null) {
      return JSON.parse(window.localStorage.getItem(ACCOUNT_KEY));
    }
    return JSON.parse(window.sessionStorage.getItem(ACCOUNT_KEY));
  }

}
