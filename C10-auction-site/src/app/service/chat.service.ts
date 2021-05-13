import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Room} from '../model/temporary/room';
import {Chat} from '../model/temporary/chat';
import {Notification} from '../model/temporary/notification';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  refRooms = firebase.database().ref('rooms/');
  refNoti = firebase.database().ref('notifications/');
  refChats = firebase.database().ref('chats/');

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

  getNotiOfUser(){
   return this.refNoti.orderByChild('role').equalTo('user');
  }

  getNotiOfAdmin(){
    return this.refNoti.orderByChild('role').equalTo('admin');
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
