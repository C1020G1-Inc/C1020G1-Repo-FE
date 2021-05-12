import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
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
  userPhone: string;
  userAddress: string;

  userId: number;


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
}
