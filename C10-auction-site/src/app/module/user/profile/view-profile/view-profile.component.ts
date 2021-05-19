import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {TokenStorageService} from "../../../../service/authentication/token-storage";
import {Title} from "@angular/platform-browser";
import {AccountService} from "../../../../service/account.service";
import {finalize} from 'rxjs/operators';
import {MatLoadingDiaComponent} from '../../material/mat-loading-dia/mat-loading-dia.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userLogin: User;
  accountLogin: Account;
  selectedImage: any;
  avatar: string;
  constructor(private token: TokenStorageService,
              private title: Title,
              private accountService: AccountService,
              private storage: AngularFireStorage,
              private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.title.setTitle('Xem thông tin người dùng')
    this.accountService.findAccount(this.token.getAccount().accountId).subscribe(data =>{
      this.accountLogin = data;
      this.userLogin = this.accountLogin.user;
      this.avatar = this.accountLogin.user.avatar;
    });
  }

  submitAvatar() {
    if (this.selectedImage !== null) {
      const filePath = `avatar/${this.selectedImage.name}/${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.avatar = url;
            this.dialog.closeAll();
          });
        })
      ).subscribe(() => { }, () => this.dialog.closeAll()
      );
    }
  }

  changeImage(event) {
    this.avatar = ''
    this.dialog.open(MatLoadingDiaComponent, { panelClass: 'loading-dialog', position: { top: '0', left: '17%' }, disableClose: true });
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      this.submitAvatar();
    } else {
      this.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaDVphQLEDiL6PDlQULiIyHHt_s8eeBdCiw&usqp=CAU';
      this.selectedImage = null;
      this.dialog.closeAll();
    }
  }
}
