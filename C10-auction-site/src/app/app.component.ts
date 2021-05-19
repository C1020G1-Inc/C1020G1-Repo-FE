import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import {Account} from './model/Account';
import {TokenStorageService} from './service/authentication/token-storage';
import {AccountVisitor} from './model/account-visitor';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C10-auction-site';
  account: Account;
  role: string[];
  isAdminPage

  accountVisitor: AccountVisitor = {
    accountEmail: '', accountLogoutTime: '', accountName: '', accountRole: 'VISITOR', user: undefined

  };

  constructor(private router: Router,
              private tokenStorage: TokenStorageService) {
    this.account = this.tokenStorage.getAccount();
    this.role = this.tokenStorage.getRoles();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isAdminPage = e.url.includes('admin');
      }
    });

    if (!this.account) {
      let text = 'Khách ';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      this.accountVisitor.accountName = text;
      this.tokenStorage.saveAccountVisitorSession(this.accountVisitor);
    }

    if (!this.role) {
      this.role = ['VISITOR'];
    }
  }

}
