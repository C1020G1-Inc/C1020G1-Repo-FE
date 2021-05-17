import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../../../service/user.service";
import {TokenStorageService} from "../../../../service/authentication/token-storage";
import {Account} from "../../../../model/Account";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public formEditUser: FormGroup;
  public accountId;
  public message: string;
  public accountLogin: Account;

  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    public userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public tokenService: TokenStorageService,
    private title: Title,
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Chỉnh sửa thông tin người dùng');
    this.accountService.findAccount(this.tokenService.getAccount().accountId).subscribe(data => {
      this.accountLogin = data;
    });
    this.formEditUser = this.formBuilder.group({
      userId: [''],
      userName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      identity: ['', [Validators.required, Validators.pattern('(\\d{9})|(\\d{12})')]],
      phone: ['', [Validators.required, Validators.pattern('(090|091|[(]84[)][+]90|[(]84[)][+]91)\\d{7}')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      avatar: [''],
    })
    this.activatedRoute.params.subscribe(data => {
      this.accountId = data.id;
      this.accountService.findAccount(this.accountId).subscribe(data1 => {
        this.formEditUser.patchValue(data1);
        this.formEditUser.patchValue(data1.user);
        // format dữ liệu từ DB lên Client
        this.formEditUser.controls.birthday.setValue(
          data1.user.birthday = new Date(new Date(data1.user.birthday).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10));
        console.log(this.formEditUser.value);
      });
    });
  }

  updateUser() {
    if (this.accountLogin.email != this.formEditUser.value.email) {
      this.accountService.updateEmail(this.accountLogin.email, this.formEditUser.value.email).subscribe();
    }
    this.userService.updateUser(this.accountId, this.formEditUser.value).subscribe(data => {
      this.accountLogin.user = this.formEditUser.value;
      this.tokenService.saveAccountStorage(this.accountLogin);
      this.message = 'Cập nhật thành công !!';
    });
  }

  get userName() {
    return this.formEditUser.get('userName');
  }

  get email() {
    return this.formEditUser.get('email');
  }

  get birthday() {
    return this.formEditUser.get('birthday');
  }

  get identity() {
    return this.formEditUser.get('identity');
  }

  get phone() {
    return this.formEditUser.get('phone');
  }

  get address() {
    return this.formEditUser.get('address');
  }
}
