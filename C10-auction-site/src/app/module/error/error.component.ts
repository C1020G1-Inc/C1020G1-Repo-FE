import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../../model/temporary/account';
import {UserDTO} from '../../model/temporary/userDTO';
import firebase from 'firebase';
import {Room} from '../../model/temporary/room';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  user1: UserDTO = {
    userAddress: '',
    userAvatar: 'https://firebasestorage.googleapis.com/v0/b/social-d792e.appspot.com/o/cf6ada6aa3294a771338.jpg?alt=media&token=6ad320a0-e8a2-4317-965a-0b9014f3254c',
    userBirthday: '',
    userIdentity: '',
    userName: 'Lê Quang Dương',
    userPhone: ''
  };

  account1: Account = {
    accountEmail: 'maybiluyena@gmail.com',
    accountLogoutTime: '2021-02-01 10:05:20',
    accountName: 'duongthu',
    user: this.user1,
    accountRole: 'user'
  };

  user2: UserDTO = {
    userAddress: '',
    userAvatar: 'https://firebasestorage.googleapis.com/v0/b/social-d792e.appspot.com/o/iron man movies comics armor marvel comics 1920x1080 wallpaper_www.wallpaperhi.com_55.jpg?alt=media',
    userBirthday: '',
    userIdentity: '',
    userName: 'Lê Dương Thư',
    userPhone: ''
  };

  account2: Account = {
    accountEmail: 'maybiluyena@gmail.com',
    accountLogoutTime: '2021-02-01 10:05:20',
    accountName: 'Thu',
    user: this.user2,
    accountRole: 'admin'
  };

  ref = firebase.database().ref('rooms/');

  room = new Room(this.account1.accountName, this.user1, 0);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.addRoom(this.room);
    localStorage.clear();
    localStorage.setItem('nickname', this.account2.accountName);
    localStorage.setItem('account', JSON.stringify(this.account2));
    this.router.navigate(['/admin/chat', this.account1.accountName]);
  }

  addRoom(room){
    this.ref.orderByChild('roomName').equalTo(room.roomName).on('child_added', (snapshot: any) => {
      if (!snapshot.exists()) {
        const newRoom = firebase.database().ref('rooms/').push();
        newRoom.set(room);
      }
    });
  }
}
