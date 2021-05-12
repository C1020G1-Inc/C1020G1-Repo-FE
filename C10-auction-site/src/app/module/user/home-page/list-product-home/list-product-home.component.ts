import { TokenStorageService } from './../../../../service/authentication/token-storage';
import { AccountService } from './../../../../service/authentication/account-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product-home',
  templateUrl: './list-product-home.component.html',
  styleUrls: ['./list-product-home.component.css']
})
export class ListProductHomeComponent implements OnInit {

  constructor(private accountService: AccountService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout().subscribe(() => {
      this.tokenStorage.logOut();
      this.router.navigateByUrl('/');
    });
  }
}
