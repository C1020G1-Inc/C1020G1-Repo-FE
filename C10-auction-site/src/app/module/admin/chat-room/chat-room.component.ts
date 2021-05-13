import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {UserDTO} from '../../../model/temporary/userDTO';
import {Chat} from '../../../model/temporary/chat';
import {Notification} from '../../../model/temporary/notification';
import {ChatService} from '../../../service/chat.service';
import {File} from '../../../model/temporary/file';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {


  chatForm: FormGroup;
  nickname = '';
  roomName = '';
  message = '';
  user: UserDTO;
  chats = new Array<Chat>();
  fileImage = new Array<File>();
  urlImage: [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe,
              private chatService: ChatService) { }

  ngOnInit(): void {

    this.chatForm = this.formBuilder.group({
      message : [null, Validators.required]
    });

    this.nickname = JSON.parse(localStorage.getItem('account')).accountName;
    this.roomName = this.route.snapshot.params.roomname;
    if (this.roomName) {
      this.chatService.refChats.on('value', resp => {
        this.chats = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.roomName);
        this.setTimeForChat();
      });
      this.chatService.refRooms.orderByChild('roomName').equalTo(this.roomName).on('child_added', (resp2: any) => {
        this.user = resp2.val().user;
      });
    }
  }

  onFormSubmit(form: any) {
    if (form.message) {
      const chat = form;
      chat.roomName = this.roomName;
      chat.nickname = this.nickname;
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.type = 'message';
      this.chatService.addNewChat(chat);

      const notification = new Notification(chat, false, 'admin', this.user.userName, this.user.userAvatar);
      this.chatService.addNewNoti(notification);
      this.chatForm.reset();
    }
  }

  private setTimeForChat() {
    const currentDate = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    for (const chat of this.chats) {
      const minute = (Date.parse(currentDate) - Date.parse(chat.date)) / (1000 * 60);
      if (minute < 1) {
        chat.date = 'vừa xong';
        return;
      } else if (minute > 1 && minute < 60) {
        chat.date = Math.round(minute) + ' phút trước';
        return;
      }
      const hour = minute / 60 ;

      if (hour < 2) {
        chat.date = Math.round(hour) + ' giờ trước';
      } else if (hour > 2 && hour < 24) {
        chat.date = Math.round(hour) + ' giờ trước';
      } else {
        chat.date = chat.date.slice(0, 10);
      }

    }

  }

  readNoti() {
    // firebase.database().ref('notifications/').child()
  }

  importImages($event) {
    const files = $event.target.files;
    if (files) {
      for (const file of files) {
        const name = file.type;
        const size = file.size;
        if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
          if (size <= 1000000) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.fileImage.push( new File(e.target.result, file ) );
            };
            reader.readAsDataURL(file);
          } else {
            return this.message = 'Big size!!';
          }
        } else {
          return this.message = 'Not Image!!';
        }
      }
    }
  }

  deleteUpdateImage($event) {
    const index = $event.target.attributes['data-index'].value;
    this.fileImage.splice(index, 1);
  }

}
