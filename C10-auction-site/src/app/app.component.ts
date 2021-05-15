import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Account} from './model/Account';
import firebase from 'firebase';
import {TokenStorageService} from './service/authentication/token-storage';
import {AccountVisitor} from './model/temporary/account';
const config = {
  apiKey: 'AIzaSyAeEkA0jE_MBTI6MPbyEH52woIlrmVNYBg',
  authDomain: 'c10auctionroom.firebaseapp.com',
  databaseURL: 'https://c10auctionroom-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'c10auctionroom',
  storageBucket: 'c10auctionroom.appspot.com',
  messagingSenderId: '666650785329',
  appId: '1:666650785329:web:67b70846f8184eea258710'
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C10-auction-site';
  account: Account;
  role: string[];

  accountVisitor: AccountVisitor = {
    accountEmail: '', accountLogoutTime: '', accountName: '', accountRole: 'VISITOR', user: undefined

  };

  constructor(private router: Router,
              private tokenStorage: TokenStorageService) {
    firebase.initializeApp(config);
    this.account = this.tokenStorage.getAccount();
    this.role = this.tokenStorage.getRoles();
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
