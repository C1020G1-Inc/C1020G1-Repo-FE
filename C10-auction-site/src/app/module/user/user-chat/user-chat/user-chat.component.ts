import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import firebase from 'firebase';
import {Chat} from '../../../../model/temporary/chat';
import {Account} from '../../../../model/temporary/account';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
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
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  chats = new Array<Chat>();
  account: Account;
  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.hideChat(0);
    this.chatForm = this.formBuilder.group({
      message : [null, Validators.required]
    });
    this.account = JSON.parse(localStorage.getItem('account'));
    firebase.database().ref('chats/').on('value', resp => {
      this.chats = snapshotToArray(resp).filter(x => x.roomName === this.account.accountName);
      this.setTimeForChat();
    });
  }

  toggleFab() {
    $('.prime').toggleClass('zmdi-comment-outline');
    $('.prime').toggleClass('zmdi-close');
    $('.prime').toggleClass('is-active');
    $('.prime').toggleClass('is-visible');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab').toggleClass('is-visible');
  }

  hideChat(hide) {
    switch (hide) {
      case 0:
        $('#chat_converse').css('display', 'none');
        $('#chat_body').css('display', 'none');
        $('.chat_login').css('display', 'block');
        $('.chat_fullscreen_loader').css('display', 'none');
        $('#chat_fullscreen').css('display', 'none');
        break;
      case 1:
        $('#chat_converse').css('display', 'block');
        $('#chat_body').css('display', 'none');
        $('.chat_login').css('display', 'none');
        $('.chat_fullscreen_loader').css('display', 'block');
        break;
    }
  }

  fullscreen() {
    $('.fullscreen').toggleClass('zmdi-window-maximize');
    $('.fullscreen').toggleClass('zmdi-window-restore');
    $('.chat').toggleClass('chat_fullscreen');
    $('.fab').toggleClass('is-hide');
    $('.header_img').toggleClass('change_img');
    $('.img_container').toggleClass('change_img');
    $('.chat_header').toggleClass('chat_header2');
    $('.fab_field').toggleClass('fab_field2');
    $('.chat_converse').toggleClass('chat_converse2');
  }

  private setTimeForChat() {
    const currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    for (const chat of this.chats) {
      const minute = (Date.parse(currentDate) - Date.parse(chat.date)) / (1000 * 60);
      if (minute < 1) {
        chat.date = 'vừa xong';
      } else if (minute > 1 && minute < 60) {
        chat.date = Math.round(minute) + ' phút trước';
        return;
      }
      const hour = minute / 60;

      if (hour < 2) {
        chat.date = Math.round(hour) + ' giờ trước';
      } else if (hour > 2 && hour < 24) {
        chat.date = Math.round(hour) + ' giờ trước';
      } else {
        chat.date = chat.date.slice(0, 10);
      }

    }
  }


  onFormSubmit(form: any) {
    const chat = form;
    chat.roomName = this.account.accountName;
    chat.nickname = this.account.accountName;
    chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';

    firebase.database().ref('chats/').push().set(chat);

    const notification = new Notification(chat, false, 'user', this.account.user.userName, this.account.user.userAvatar);
    firebase.database().ref('notifications/').push().set(notification);

    this.chatForm.reset();
  }

}
