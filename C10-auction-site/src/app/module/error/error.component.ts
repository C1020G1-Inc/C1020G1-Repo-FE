import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../service/authentication/token-storage';
import {AccountService} from '../../service/authentication/account-service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {


  constructor(private router: Router, private tokenStorage: TokenStorageService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout().subscribe(() => {
      this.tokenStorage.logOut();
      window.location.reload();
    });
  }
}
