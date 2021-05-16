import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {Account} from '../../../../model/account';
import {TokenStorageService} from '../../../../service/authentication/token-storage';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  accountList = new Array<Account>();
  account: Account;
  userName = '';
  userAddress = '';

  userId: number;

  userEmail = '';
  page: any;


  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.account = this.tokenStorage.getAccount();
    this.userService.getAllUser().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (this.account.accountId === data[i].accountId) {
          data.splice(i, 1);
        }
      }
      this.accountList = data;
    });
  }

  getIndex(user: any) {
    this.userId = user.user.userId;
    this.userName = user.user.userName;
  }

  lockUserById(userId: number) {
    this.userService.lockUserById(userId).subscribe(data1 => this.ngOnInit());
  }

  unlockUserById(userId: number) {
    this.userService.unlockUserById(userId).subscribe(data2 => this.ngOnInit());
  }

  search() {

    if (this.userName.trim() === '') {
      this.userName = undefined;
    }
    if (this.userAddress.trim() === '') {
      this.userAddress = undefined;
    }
    if (this.userEmail.trim() === '') {
      this.userEmail = undefined;
    }

    if (this.userName === undefined && this.userAddress === undefined && this.userEmail === undefined) {
      this.getAllUser();
    } else {
      this.userService.searchUser(this.userName, this.userAddress, this.userEmail).subscribe(data => {
        this.accountList = data;
      });
    }

    this.userName = '';
    this.userAddress = '';
    this.userEmail = '';
  }
}
