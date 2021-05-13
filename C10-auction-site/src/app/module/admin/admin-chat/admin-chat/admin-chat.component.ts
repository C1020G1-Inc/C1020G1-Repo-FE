import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import firebase from 'firebase';
import {Room} from '../../../../model/temporary/room';
import {Notification} from '../../../../model/temporary/notification';


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};


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

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname');
    firebase.database().ref('rooms/').on('value', resp => {
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });

    firebase.database().ref('notifications/').orderByChild('role').equalTo('user').on('value' , (resp: any) => {
      this.notifications = snapshotToArray(resp).filter(x => x.isRead === false);
    });

  }


  enterChatRoom(room: Room) {
    for (const readNotification of this.notifications) {
      if (readNotification.chat.roomName === room.roomName) {
        firebase.database().ref('notifications/').child(readNotification.key).child('isRead').set(true);
        firebase.database().ref('rooms/').child(room.key).child('newMess').set(0);
      }
    }

    this.router.navigate(['/admin/chat', room.roomName]);
  }
}
