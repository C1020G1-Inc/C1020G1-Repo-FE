import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { AccountService } from 'src/app/service/authentication/account-service';
import { TokenStorageService } from 'src/app/service/authentication/token-storage';
import { CategoryHeaderService } from 'src/app/service/header/category-service';
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
}
