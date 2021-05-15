import {CategoryHeaderService} from '../../../../service/header/category-service';
import {TokenStorageService} from '../../../../service/authentication/token-storage';
import {AccountService} from '../../../../service/authentication/account-service';
import {Component, OnInit} from '@angular/core';
import {Account} from 'src/app/model/Account';
import {mergeMap} from 'rxjs/operators';
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
              this.notifications.push(data[property]);
              console.log(this.notifications);
            }
          }
        }
      });
  }


  logout() {
    this.accountService.logout().subscribe(() => {
      this.tokenStorage.logOut();
      window.location.reload();
    });
  }

  get isLogged() {
    return this.tokenStorage.isLogged();
  }

  get account(): Account {
    return this.tokenStorage.getAccount();
  }

  request() {
    this.accountService.test().subscribe(data => console.log(data));
  }
}
