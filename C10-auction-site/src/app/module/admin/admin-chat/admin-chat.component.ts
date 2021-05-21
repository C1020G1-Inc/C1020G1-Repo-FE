import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../../model/room';
import {Notification} from '../../../model/notification';
import {ChatService} from '../../../service/chat/chat.service';
import {TokenStorageService} from '../../../service/authentication/token-storage';
import {Account} from '../../../model/Account';


@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  nickname = '';
  rooms = new Array<Room>();
  isLoadingResults: boolean;
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
    this.isLoadingResults = true
    this.account = this.tokenStorageService.getAccount();
    this.nickname = this.tokenStorageService.getAccount().accountName;
    this.chatService.refRooms.on('value', resp => {
      this.rooms = this.chatService.snapshotToArray(resp);
      this.tempRooms = this.rooms;
      if (this.rooms) {
        this.isLoadingResults = false;
      }
      for (const roomFB of this.rooms) {
        if (roomFB.active){
          this.roomName = roomFB.roomName;
          break;
        }
      }
      console.log(this.rooms)
    });

    this.chatService.getNotiOfUser().on('value' , (resp: any) => {
      this.notifications = this.chatService.snapshotToArray(resp).filter(x => x.isRead === false);
    });

  }


  enterChatRoom(room: Room) {
    this.chatService.readNewMess(room.key);
    for (const readNotification of this.notifications) {
      if (readNotification.chat.roomName === room.roomName) {
        this.chatService.readNoti(readNotification.key);
      }
    }
    for (const roomFB of this.rooms) {
      if (roomFB.key === room.key) {
        this.chatService.refRooms.child(roomFB.key).child('active').set(true)
      }
       else {
        this.chatService.refRooms.child(roomFB.key).child('active').set(false)
      }
    }
    this.roomName = room.roomName;
  }

  search() {
    if (this.searchValue === undefined || this.searchValue.trim() === '') {
      this.searchValue = '';
      this.rooms = this.tempRooms;
    }
    let tempt = new Array<Room>();
    for (const room of this.rooms) {
      if (room.user){
        if (room.user.userName.includes(this.searchValue)) {
          tempt.push(room);
        }
      } else {
        if (room.roomName.includes(this.searchValue)) {
          tempt.push(room);
        }
      }
    }
    this.rooms = tempt;
    this.searchValue = '';
  }
}
