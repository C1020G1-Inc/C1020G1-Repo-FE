import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {TokenStorageService} from "../../../../service/authentication/token-storage";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userLogin: User;
  accountLogin: Account;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.accountLogin = this.token.getAccount();
    this.userLogin = this.accountLogin.user;
  }

}
