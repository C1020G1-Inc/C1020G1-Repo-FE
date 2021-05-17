import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {User} from '../../../../model/User';
import {Chat} from '../../../../model/chat';
import {ChatService} from '../../../../service/chat/chat.service';
import {TokenStorageService} from '../../../../service/authentication/token-storage';
import {Notification} from '../../../../model/notification';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnChanges {


  chatForm: FormGroup;
  nickname = '';
  @Input() roomName: string;
  message = '';
  user: User;
  chats = new Array<Chat>();
  selectedImage: any;
  urlImg: string;
  loadImage: boolean;
  role: string;
  notifications = new Array<Notification>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe,
              private chatService: ChatService,
              private tokenStorageService: TokenStorageService,
              public storage: AngularFireStorage,
              private snackBar: MatSnackBar) {
  }

  ngOnChanges(): void {
    this.getData();
  }

  ngOnInit(): void {

    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required]
    });

    this.nickname = this.tokenStorageService.getAccount().accountName;
    this.getData();
    setTimeout(() => {
      $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
    }, 500);
  }

  getData() {
    if (this.roomName) {
      this.chatService.refChats.on('value', resp => {
        this.chats = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.roomName);
        this.setTimeForChat();
      });

      this.chatService.refRooms.orderByChild('roomName').equalTo(this.roomName).on('child_added', (resp2: any) => {
        this.user = resp2.val().user;
      });

      this.chatService.getNotiOfUser().on('child_added', (resp: any) => {
        this.notifications = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.roomName);
      });

      if (!this.user) {
        this.user = {
          address: '',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaDVphQLEDiL6PDlQULiIyHHt_s8eeBdCiw&usqp=CAU',
          birthday: undefined,
          identity: '',
          phone: '',
          userId: 0,
          userName: this.roomName
        };
        this.role = 'Khách';
      } else {
        this.role = 'Thành Viên';
      }
    }
  }

  onFormSubmit(form: any, type: string) {
    if (form.message) {
      const chat = form;
      chat.roomName = this.roomName;
      chat.nickname = this.nickname;
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.type = type;
      this.chatService.refChats.push().set(chat).then(data => {
        this.loadImage = false;
        $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
      });

      const notification = new Notification(chat, false, 'admin', this.user.userName, this.user.avatar);
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

  readAllNoti() {
    for (const readNotification of this.notifications) {
      this.chatService.readNoti(readNotification.key);
    }
  }

  importImages($event) {
    const files = $event.target.files;
    for (const file of files) {
      const name = file.type.toString();
      if (!name.includes('image')) {

        this.snackBar.open('Đây không phải hình ảnh', 'X',
        {
          duration: 5000,
        }
      )
        ;
        return;
      }
    }
    this.loadImage = true;
    setTimeout(() => {
      $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
    }, 500);
    if ($event.target.files && $event.target.files[0]) {
      this.selectedImage = $event.target.files[0];
      this.addImageToFireBase();
    }
  }

  addImageToFireBase() {
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
