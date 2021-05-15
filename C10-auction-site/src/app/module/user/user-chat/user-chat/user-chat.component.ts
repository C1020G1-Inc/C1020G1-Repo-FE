import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import firebase from 'firebase';
import {Chat} from '../../../../model/temporary/chat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Notification} from '../../../../model/temporary/notification';
import {Room} from '../../../../model/temporary/room';
import {ChatService} from '../../../../service/chat/chat.service';
import {TokenStorageService} from '../../../../service/authentication/token-storage';
import {Account} from '../../../../model/Account';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AccountVisitor} from '../../../../model/temporary/account';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  chats = new Array<Chat>();
  account: Account;
  chatForm: FormGroup;
  room: Room;
  notifications = new Array<Notification>();
  loadImage: boolean;
  selectedImage: any;
  accountVisitor: AccountVisitor;

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private chatService: ChatService,
              private tokenStorageService: TokenStorageService,
              public storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.hideChat(0);
    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required]
    });
    this.account = this.tokenStorageService.getAccount();
    this.accountVisitor = this.tokenStorageService.getAccountVisitor();
    this.chatService.refChats.on('value', resp => {
      this.chats = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.account.accountName);
      this.setTimeForChat();
    });
    this.chatService.refNoti.orderByChild('role').equalTo('admin').on('value', (resp: any) => {
      this.notifications = this.chatService.snapshotToArray(resp)
        .filter(x => x.isRead === false && x.chat.roomName === this.account.accountName);
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
        this.readAllNoti();
        if (this.accountVisitor.accountRole) {
          this.chatService.refRooms.orderByChild('roomName').equalTo(this.accountVisitor.accountName).on('value', (resp: any) => {
            if (!resp.exists()) {
              const room = new Room(this.accountVisitor.accountName, null, 0);
              this.chatService.addNewRoom(room);
            }
          });
        }
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

  readAllNoti() {
    for (const readNotification of this.notifications) {
      this.chatService.readNoti(readNotification.key);
    }
  }

  private setTimeForChat() {
    const currentDate = Date.parse(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
    for (const chat of this.chats) {
      const minute = (currentDate - Date.parse(chat.date)) / (1000 * 60);
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


  onFormSubmit(form: any, type: string) {
    if (form.message) {
      const chat = form;
      chat.roomName = this.account.accountName;
      chat.nickname = this.account.accountName;
      chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.type = type;

      this.chatService.refChats.push().set(chat).then(data => {
        this.loadImage = false;
        $('#chat_converse').scrollTop($('#chat_converse')[0].scrollHeight);
      });
      let notification: Notification;
      if (this.account.user) {
        notification = new Notification(chat, false, 'user', this.account.user.userName, this.account.user.avatar);
      } else {
        notification = new Notification(chat, false, 'user', this.accountVisitor.accountName,
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaDVphQLEDiL6PDlQULiIyHHt_s8eeBdCiw&usqp=CAU');
      }
      this.chatService.addNewNoti(notification);

      this.chatService.refRooms.orderByChild('roomName').equalTo(chat.roomName).on('child_added', (resp: any) => {
        this.room = resp.val();
        this.room.key = resp.key;
        this.room.newMess++;
        firebase.database().ref('rooms').child(this.room.key).child('newMess').set(this.room.newMess++);
      });

      this.chatForm.reset();
    }
  }

  importImages($event) {
    const files = $event.target.files;
    for (const file of files) {
      const name = file.type.toString();
      if (!name.includes('image')) {
        alert('Đây Không Phải Hình Ảnh');
        return;
      }
    }
    this.loadImage = true;
    setTimeout(() => {
      $('#chat_converse').scrollTop($('#chat_converse')[0].scrollHeight);
    }, 500);
    if ($event.target.files && $event.target.files[0]) {
      this.selectedImage = $event.target.files[0];
      this.addImageToFireBase();
    }
  }

  private addImageToFireBase() {
    if (this.selectedImage !== null) {
      const filePath = `avatar/${this.selectedImage.name}/${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.chatForm.get('message').setValue(url);
            this.onFormSubmit(this.chatForm.value, 'image');
          });
        })
      ).subscribe();
    }
  }
}
