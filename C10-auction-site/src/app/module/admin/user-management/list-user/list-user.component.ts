import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {Account} from '../../../../model/account';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  userList: Account[];
  account: Account;
  userName: string;
  userAddress: string;

  userId: number;

  userEmail: string;
  page: any;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      console.log(data);
      this.userList = data;
    });
  }

  getIndex(user: any) {
    this.userId = user.user.userId;
    this.userName = user.user.userName;
  }

  deleteUserById(userId: number) {
    this.userService.deleteUserById(userId).subscribe(data => this.ngOnInit());
  }

  lockUserById(userId: number) {
    this.userService.lockUserById(userId).subscribe(data1 => this.ngOnInit());
  }

  unlockUserById(userId: number) {
    this.userService.unlockUserById(userId).subscribe(data2 => this.ngOnInit());
  }

  search() {
    if (this.userId === undefined){
      this.userId = 0;
    }
    console.log(this.userId);
    this.userService.searchUser(this.userName, this.userId, this.userAddress, this.userEmail).subscribe(data => {
      this.userList = data;
      console.log(data);
    });
  }
}
