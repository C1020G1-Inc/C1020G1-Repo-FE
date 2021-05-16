import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../../../model/User";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  public formEditUser: FormGroup;
  public accountId;
  public message: string;

  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    public userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formEditUser = this.formBuilder.group({
      userId: [''],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      identity: ['', [Validators.required, Validators.pattern('(\\d{9})|(\\d{12})')]],
      phone: ['', [Validators.required, Validators.pattern('(090|091|[(]84[)][+]90|[(]84[)][+]91)\\d{7}')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    })

    this.activatedRoute.params.subscribe(data => {
      this.accountId = data.id;
      this.accountService.findAccount(this.accountId).subscribe(data1 => {
        this.formEditUser.patchValue(data1);
        this.formEditUser.patchValue(data1.user);
      });
    });
  }

  updateUser() {
    // console.log(this.formEditUser.value);
    this.userService.updateUser(this.accountId, this.formEditUser.value).subscribe(data => {
      this.message = 'Cập nhật thành công !!';
      console.log(data);
    });
  }

  get userName(){
    return this.formEditUser.get('userName');
  }
  get email(){
    return this.formEditUser.get('email');
  }
  get birthday(){
    return this.formEditUser.get('birthday');
  }
  get identity(){
    return this.formEditUser.get('identity');
  }
  get phone(){
    return this.formEditUser.get('phone');
  }
  get address(){
    return this.formEditUser.get('address');
  }


}
