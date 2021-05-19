
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { AccountService } from 'src/app/service/authentication/account-service';
import { TokenStorageService } from 'src/app/service/authentication/token-storage';
import { CategoryHeaderService } from 'src/app/service/header/category-service';

import {FirebaseDatabaseService} from '../../../../service/auction-bidding/firebase-database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categoryList = [];
  notifications = [];

  constructor(private accountService: AccountService, private tokenStorage: TokenStorageService,
              private cateService: CategoryHeaderService,
              private firebaseDatabaseService: FirebaseDatabaseService) {
  }

  ngOnInit(): void {
    this.cateService.findAll().subscribe(data => this.categoryList = data);

    this.firebaseDatabaseService.getNotifyByAccount(this.account.accountId)
      .subscribe(data => {
        if (data != null) {
          this.notifications = [];
          for (const property in data) {
            if (data.hasOwnProperty(property)) {
              data[property].key = property;
              this.notifications.push(data[property]);
            }
          }
        }
      });
  }

  /**
   * @author PhinNL
   * logout
   */
  logout() {
    this.accountService.logout().subscribe(() => {
      this.tokenStorage.logOut();
      window.location.reload();
    });
  }

  /**
   * @author PhinNL
   * get isLogged
   */
  get isLogged() {
    return this.tokenStorage.isLogged();
  }

  /**
   * @author PhinNL
   */
  get account(): Account {
    return this.tokenStorage.getAccount();
  }

  request() {
    this.accountService.test().subscribe(data => console.log(data));
  }

  /**
   * @author PhucPT
   */
  deleteNotification(key){
    this.firebaseDatabaseService.deleteNotification(key, this.account.accountId).then();
  }

  /**
   * @author: PhinNl
   */
  get isAdmin() {
    return this.tokenStorage.getRoles().includes('ADMIN');
  }
}
