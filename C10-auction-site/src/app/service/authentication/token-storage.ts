import { Account } from './../../model/Account';
import { JwtResponse } from './JwtRespone';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'X4dr1vOeejA9pWEc7VuF';
const ACCOUNT_KEY = 'SCisnPM9Obi0JnEGBTtK';
const ROLES_KEY = 'pPpPFvvv5ax291ETMe38';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    logOut() {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }

    public saveData(data: JwtResponse, remmember: boolean) {
        this.logOut();
        if (remmember) {
            this.saveTokenStorage(data.jwtToken);
            this.saveAccountStorage(data.account);
            this.saveRolesStorage(data.roles);
        } else {
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
        if (this.isRemember()) {
            return JSON.parse(localStorage.getItem(ROLES_KEY));
        }
        return JSON.parse(sessionStorage.getItem(ROLES_KEY));
    }

    public getAccount(): Account {
        if (this.isRemember()) {
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
}
