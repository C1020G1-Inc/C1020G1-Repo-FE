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
  selectedImages = [];
  tempFile = [];
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
      message: [null, [Validators.required,Validators.maxLength(1000)]]
    });

    this.nickname = this.tokenStorageService.getAccount().accountName;
    this.getData();
  }

  getData() {
    if (this.roomName) {
      this.chatService.refChats.on('value', resp => {
        this.chats = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.roomName);
        // this.setTimeForChat();
        $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);

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
    if (this.chatForm.get('message').errors?.maxlength) {
      this.snackBar.open('Tin nhắn bạn nhập quá dài', 'X',
        {
          duration: 5000,
        });
      return;
    }
    this.addImageToFireBase()
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

  // private setTimeForChat() {
  //   const currentDate = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
  //   for (const chat of this.chats) {
  //     const minute = (Date.parse(currentDate) - Date.parse(chat.date)) / (1000 * 60);
  //     if (minute < 1) {
  //       chat.date = 'vừa xong';
  //       return;
  //     } else if (minute > 1 && minute < 60) {
  //       chat.date = Math.round(minute) + ' phút trước';
  //       return;
  //     }
  //     const hour = minute / 60;
  //
  //     if (hour < 2) {
  //       chat.date = Math.round(hour) + ' giờ trước';
  //     } else if (hour > 2 && hour < 24) {
  //       chat.date = Math.round(hour) + ' giờ trước';
  //     } else {
  //       chat.date = chat.date.slice(0, 10);
  //     }
  //
  //   }
  //
  // }

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
        return;
      }
    }

    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push({url: e.target.result, file: file})
        };
        reader.readAsDataURL(file);
      }
    }
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
  }

  addImageToFireBase() {
    this.tempFile = this.selectedImages;
    this.selectedImages = [];
    return new Promise(resolve => {
      Promise.all(this.tempFile.map(file =>
        new Promise((resolve) => {
          this.loadImage = true;
          const name = file.file.name;
            const fileRef = this.storage.ref(name);
            this.storage.upload(name, file.file).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL()
                  .subscribe((url) => {
                    let chat = new Chat();
                    chat.message = url;
                    chat.roomName = this.roomName;
                    chat.nickname = this.nickname;
                    chat.date = new Date();
                    chat.type = 'image';
                    this.chatService.refChats.push().set(chat).then(data => {
                      this.loadImage = false;
                      $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
                    });
                    resolve(1);
                  });
              })).subscribe();
        }))).then(() => {
        resolve(1)
      });
    });
  }

  deleteUpdateImage($event) {
    if (this.selectedImages.length === 1) {
      this.selectedImages = [];
      return;
    }
    let index = $event.target.attributes['data-index'].value;
    this.selectedImages = this.selectedImages.slice(0, index).concat(this.selectedImages.slice(index + 1, this.selectedImages.length));

  }
}
