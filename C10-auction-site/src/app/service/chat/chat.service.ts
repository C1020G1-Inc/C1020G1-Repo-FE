import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Room} from '../../model/room';
import {Chat} from '../../model/chat';
import {Notification} from '../../model/notification';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  snapshotToArray = (snapshot: any) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }


  get refRooms() {
    return firebase.database().ref('rooms/');
  }

  get refNoti() {
    return firebase.database().ref('notifications-admin/');
  }

  get refChats() {
    return firebase.database().ref('chats/');
  }

  getNotiOfUser(){
   return this.refNoti.orderByChild('role').equalTo('user');
  }

  readNoti(key){
    return this.refNoti.child(key).child('isRead').set(true);
  }

  readNewMess(key){
    return this.refRooms.child(key).child('newMess').set(0);
  }

  addNewRoom(room: Room) {
    this.refRooms.push().set(room);
  }

  addNewChat(chat: Chat) {
    this.refChats.push().set(chat);
  }

  addNewNoti(notification: Notification) {
    this.refNoti.push().set(notification);
  }

}