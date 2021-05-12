import { Router } from '@angular/router';
import { AccountService } from './../../../../service/authentication/account-service';
import { User } from './../../../../model/User';
import { TokenStorageService } from './../../../../service/authentication/token-storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  constructor(private tokenStorage: TokenStorageService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    let email = '';
    let username = '';
    const account = this.tokenStorage.getAccount();
    if (account !== null) {
      email = account.email;
      if (account.user !== null) {
        username = account.user.userName;
      }
    }
    const now = new Date();
    this.minDate = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
    this.maxDate = new Date(now.getFullYear() - 16, now.getMonth(), now.getDate());
    this.form = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{1,5}[a-zA-Z0-9]{7,15}$')],
        [this.accountNameDuplicateValidator.bind(this)]),
      userName: new FormControl(username, [Validators.required, this.nameValidator.bind(this)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      this.checkpass.bind(this)]),
      repassword: new FormControl('', [Validators.required, this.repasswordValidator.bind(this)]),
      email: new FormControl(email, [Validators.required, Validators.pattern('[a-zA-z]\\w{6,20}[@][a-zA-Z]{2,10}([.][a-zA-Z]{2,5}){1,2}')],
        [this.emailDuplicateValidator.bind(this)]),
      birthday: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('(0|84)\\d{9}')], [this.phoneDuplicateValidator.bind(this)]),
      identity: new FormControl('', [Validators.required, Validators.pattern('\\d{9}(\\d{3})?')],
        [this.identityDuplicateValidator.bind(this)]),
      address: new FormControl('', [Validators.required]),
      avatar: new FormControl(''),
      checkbox: new FormControl(false, [Validators.requiredTrue])
    });
  }

  accountNameDuplicateValidator(control: FormControl) {
    return this.accountService.findAccountNameExist(control.value).pipe(
      map(data => {
        if (data.accountDuplicate !== null) {
          return { accountDuplicate: data.accountDuplicate };
        }
        return null;
      })
    );
  }

  emailDuplicateValidator(control: FormControl) {
    return this.accountService.findEmailExist(control.value).pipe(
      map(data => {
        if (data.emailDuplicate !== null) {
          return { emailDuplicate: data.emailDuplicate };
        }
        return null;
      })
    );
  }

  phoneDuplicateValidator(control: FormControl) {
    return this.accountService.findPhoneExist(control.value).pipe(
      map(data => {
        if (data.phoneDuplicate !== null) {
          return { phoneDuplicate: data.phoneDuplicate };
        }
        return null;
      })
    );
  }

  identityDuplicateValidator(control: FormControl) {
    return this.accountService.findIdentityExist(control.value).pipe(
      map(data => {
        if (data.identityDuplicate !== null) {
          return { identityDuplicate: data.identityDuplicate };
        }
        return null;
      })
    );
  }

  checkpass(control: FormControl) {
    if (control.parent && this.repassword) {
      if (control.value !== this.repassword.value) {
        setTimeout(() => this.repassword.setErrors({ repassword: this.repassword.value }), 0);
      } else if (this.repassword.value !== '') {
        setTimeout(() => this.repassword.setErrors(null), 0);
      }
    }
    return null;
  }

  repasswordValidator(control: FormControl) {
    let password = '';
    if (control.parent) {
      password = this.password.value;
    }
    return control.value === password ? null : { repassword: control.value };
  }

  nameValidator(control: FormControl) {
    return /^([\p{Lu}]|([\p{Lu}][\p{Ll}]{1,8}))(\s([\p{Lu}]|[\p{Lu}][\p{Ll}]{1,10})){0,5}$/u.test(control.value) ?
      null : { userName: control.value };
  }

  submit() {
    const userNew: User = {
      userId: null,
      userName: this.userName.value,
      birthday: new Date(this.birthday.value),
      phone: this.phone.value,
      identity: this.identity.value,
      avatar: this.avatar.value,
      address: this.address.value
    };
    const account: Account = {
      accountId: null,
      accountName: this.accountName.value,
      password: this.password.value,
      email: this.email.value,
      enable: true,
      logoutTime: null,
      user: userNew
    };
    this.accountService.saveAccount(account).subscribe(data => {
      if (data !== null) {
        this.router.navigateByUrl('/');
      }
    });
  }

  con() {
    console.log(this.form);
  }

  changeImage(event) {
    console.log(event);
  }

  get accountName() {
    return this.form.get('accountName');
  }
  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }
  get repassword() {
    return this.form.get('repassword');
  }
  get email() {
    return this.form.get('email');
  }
  get birthday() {
    return this.form.get('birthday');
  }
  get phone() {
    return this.form.get('phone');
  }
  get identity() {
    return this.form.get('identity');
  }
  get address() {
    return this.form.get('address');
  }
  get avatar() {
    return this.form.get('avatar');
  }
}
