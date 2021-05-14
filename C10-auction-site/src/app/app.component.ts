import { Component } from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {Account} from './model/temporary/account';
const config = {
  apiKey: 'AIzaSyAeEkA0jE_MBTI6MPbyEH52woIlrmVNYBg',
  databaseURL: 'https://c10auctionroom-default-rtdb.asia-southeast1.firebasedatabase.app'
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C10-auction-site';
  account: Account;

  constructor(private router: Router) {
    firebase.initializeApp(config);
    this.account = JSON.parse(window.localStorage.getItem('account'));
  }
}
