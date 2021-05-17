import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../../model/room';
import {Notification} from '../../../model/notification';
import {ChatService} from '../../../service/chat/chat.service';
import {TokenStorageService} from '../../../service/authentication/token-storage';
import {Account} from '../../../model/Account';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  nickname = '';
  rooms = new Array<Room>();
  isLoadingResults = true;
  notifications = new Array<Notification>();
  year = new Date().getFullYear();
  roomName: string;
  account: Account;
  searchValue: string;
  tempRooms = new Array<Room>();

  constructor(private route: ActivatedRoute, private router: Router,
              private chatService: ChatService,
              private tokenStorageService: TokenStorageService,
              ) {
  }

  ngOnInit(): void {
    this.account = this.tokenStorageService.getAccount();
    this.nickname = this.tokenStorageService.getAccount().accountName;
    this.chatService.refRooms.on('value', resp => {
      this.rooms = this.chatService.snapshotToArray(resp);
      this.tempRooms = this.rooms;
      this.isLoadingResults = false;
    });

    this.chatService.getNotiOfUser().on('value' , (resp: any) => {
      this.notifications = this.chatService.snapshotToArray(resp).filter(x => x.isRead === false);
    });

  }


  enterChatRoom(room: Room) {
    console.log(room);
    this.chatService.readNewMess(room.key);
    for (const readNotification of this.notifications) {
      if (readNotification.chat.roomName === room.roomName) {
        this.chatService.readNoti(readNotification.key);
      }
    }
    this.roomName = room.roomName;
  }

  search() {
    if (this.searchValue === undefined || this.searchValue.trim() === '') {
      this.searchValue = '';
      this.rooms = this.tempRooms;
    }
    this.rooms = this.rooms.filter(x => x.roomName.includes(this.searchValue))
    this.searchValue = '';
  }
}
