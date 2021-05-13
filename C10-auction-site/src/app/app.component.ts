import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Account} from './model/temporary/account';
import firebase from 'firebase';
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

  constructor(private router: Router) {
    firebase.initializeApp(config);
    this.account = JSON.parse(window.localStorage.getItem('account'));
  }
}
