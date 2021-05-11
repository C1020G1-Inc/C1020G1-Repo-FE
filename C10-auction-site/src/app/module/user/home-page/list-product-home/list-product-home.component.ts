import { Router } from '@angular/router';
import { TokenStorageService } from './../../../../service/authentication/token-storage';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { TestService } from 'src/app/service/test-service';

@Component({
  selector: 'app-list-product-home',
  templateUrl: './list-product-home.component.html',
  styleUrls: ['./list-product-home.component.css']
})
export class ListProductHomeComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router, private testService: TestService) { }

  ngOnInit(): void {
  }

  get token(): string {
    return this.tokenStorage.getToken();
  }

  get account(): Account {
    return this.tokenStorage.getAccount();
  }

  get roles(): string[] {
    return this.tokenStorage.getRoles();
  }

  logout() {
    this.tokenStorage.logOut();
    this.router.navigateByUrl('/');
  }

  requestAdmin() {
    this.testService.requestAdmin().subscribe(data => console.log(data), err => {
      if (err.status === 401) {
        this.logout();
      }
    });
  }

  requestMember() {
    this.testService.requestMember().subscribe(data => console.log(data));
  }

  requestGuest() {
    this.testService.requestGuest().subscribe(data => console.log(data));
  }
}
