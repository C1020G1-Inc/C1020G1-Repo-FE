import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userLogin: User = {
    userId: 1,
    userName: 'Hồ Anh Dụng',
    birthday: '1997-01-02',
    phone: '090512312',
    identity: '123456456',
    address: '123 Lê Độ',
    avatar: 'qưeqwe'
  };

  accountLoggin: Account = {
    accountId: 1,
    accountName: 'anhdung',
    password: '$2a$10$h5ZtBnGe4zRcgshrQVhwF.pQk1JS2SX5iT2qLz9bRwWFM9G2zdaru',
    email: 'anhdung@gmail.com',
    enable: true,
    user: this.userLogin
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
