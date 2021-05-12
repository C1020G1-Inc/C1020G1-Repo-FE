import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import firebase from 'firebase';
import {UserDTO} from '../../../model/temporary/userDTO';
import {Chat} from '../../../model/temporary/chat';

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
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  // @ViewChild('chatcontent') chatcontent: ElementRef;
  // scrolltop: number = null;

  chatForm: FormGroup;
  nickname = '';
  roomName = '';
  message = '';
  user: UserDTO;
  chats = new Array<Chat>();
  ref = firebase.database().ref('rooms/');
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.chatForm = this.formBuilder.group({
      message : [null, Validators.required]
    });

    this.nickname = JSON.parse(localStorage.getItem('account')).accountName;
    this.roomName = this.route.snapshot.params.roomname;
    if (this.roomName) {
      firebase.database().ref('chats/').on('value', resp => {
        this.chats = snapshotToArray(resp).filter(x => x.roomName === this.roomName);
        this.setTimeForChat();

      });
      firebase.database().ref('rooms').orderByChild('roomName').equalTo(this.roomName).on('child_added', (resp2: any) => {
        this.user = resp2.val().user;
      });
    }
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomName = this.roomName;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm.reset();
  }

  private setTimeForChat() {
    const currentDate = new Date();

    // tslint:disable-next-line:forin
    for (const chat of this.chats) {
    const seconds = (currentDate.getTime() - Date.parse(chat.date)) / 1000;
    }
  }

}
