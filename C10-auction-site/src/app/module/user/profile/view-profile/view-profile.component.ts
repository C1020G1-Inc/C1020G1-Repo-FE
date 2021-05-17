import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {TokenStorageService} from "../../../../service/authentication/token-storage";
import {Title} from "@angular/platform-browser";
import {AccountService} from "../../../../service/account.service";
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userLogin: User;
  accountLogin: Account;
  constructor(private token: TokenStorageService,
              private title: Title,
              private accountService: AccountService,) {
  }
  ngOnInit(): void {
    this.title.setTitle('Xem thông tin người dùng')
    this.accountService.findAccount(this.token.getAccount().accountId).subscribe(data =>{
      this.accountLogin = data;
      this.userLogin = this.accountLogin.user;
    });
  }
}
