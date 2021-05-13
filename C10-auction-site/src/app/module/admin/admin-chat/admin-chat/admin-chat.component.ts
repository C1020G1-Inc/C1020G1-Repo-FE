import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import firebase from 'firebase';
import {Room} from '../../../../model/temporary/room';
import {Notification} from '../../../../model/temporary/notification';
import {ChatService} from '../../../../service/chat.service';


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

  constructor(private route: ActivatedRoute, private router: Router,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname');
    this.chatService.refRooms.on('value', resp => {
      this.rooms = this.chatService.snapshotToArray(resp);
      this.isLoadingResults = false;
    });

    this.chatService.getNotiOfUser().on('value' , (resp: any) => {
      this.notifications = this.chatService.snapshotToArray(resp).filter(x => x.isRead === false);
    });

  }


  enterChatRoom(room: Room) {
    for (const readNotification of this.notifications) {
      if (readNotification.chat.roomName === room.roomName) {
        this.chatService.readNoti(readNotification.key);
        this.chatService.readNewMess(room.key);
      }
    }

    this.router.navigate(['/admin/chat', room.roomName]);
  }
}
