import { CategoryHeaderService } from './../../../service/header/category-service';
import { TokenStorageService } from './../../../service/authentication/token-storage';
import { AccountService } from './../../../service/authentication/account-service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categoryList = [];
  constructor(private accountService: AccountService, private tokenStorage: TokenStorageService,
              private cateService: CategoryHeaderService) { }

  ngOnInit(): void {
    this.cateService.findAll().subscribe(data => this.categoryList = data);
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
