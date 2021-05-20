import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisDistrict, RegisProvince, RegisWard } from 'src/app/service/authentication/account-province';
import { Title } from '@angular/platform-browser';
import { ChatService } from '../../../../service/chat/chat.service';
import { AccountService } from '../../../../service/authentication/account-service';
import { TokenStorageService } from '../../../../service/authentication/token-storage';
import { User } from '../../../../model/User';
import { Room } from '../../../../model/room';
import { MatRegisDiaComponent } from '../../material/mat-regis-dia/mat-regis-dia.component';
import { MatLoadingDiaComponent } from '../../material/mat-loading-dia/mat-loading-dia.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * @author PhinNL
 * Register
 */
export class RegisterComponent implements OnInit {
  form: FormGroup;
  code: string = '';
  message: string = '';
  minDate: Date;
  maxDate: Date;
  selectedImage: any;
  provinceList: RegisProvince[] = [];
  districtList: RegisDistrict[] = [];
  wardList: RegisWard[] = [];
  imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaDVphQLEDiL6PDlQULiIyHHt_s8eeBdCiw&usqp=CAU';
  constructor(private tokenStorage: TokenStorageService, private accountService: AccountService,
              private router: Router, private storage: AngularFireStorage, private dialog: MatDialog,
              private chatService: ChatService,
              private title: Title, private elementRef: ElementRef) { }


  ngOnInit(): void {
    this.title.setTitle('Đăng ký');
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'hsla(0, 0%, 65.9%, .4)';
    if (this.tokenStorage.isLogged()) {
      this.router.navigateByUrl('/home');
    }
    this.accountService.getAllProvince().subscribe(data => {
      this.provinceList = data.results;
      this.province.setValue(this.provinceList[0].province_name);
      this.accountService.getAllDistrictByProvince(this.provinceList[0].province_id).subscribe(dataDis => {
        this.districtList = dataDis.results;
        this.district.setValue(this.districtList[0].district_name);
        this.accountService.getAllWardByDistrict(this.districtList[0].district_id).subscribe(dataWard => {
          this.wardList = dataWard.results;
          this.ward.setValue(this.wardList[0].ward_name);
          if (this.wardList === undefined || this.wardList.length === 0) {
            this.address.setValue(this.district.value + ' ' + this.province.value);
          } else {
            this.address.setValue(this.ward.value + ' ' + this.district.value + ' ' + this.province.value);
          }
        });
      });
    });
    let email = '';
    let username = '';
    const account = this.tokenStorage.getAccount();
    if (account !== null) {
      email = account.email != undefined ? account.email : '';
      if (account.user != undefined) {
        username = account.user.userName != undefined ? account.user.userName : '';
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
      email: new FormControl(email, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
        [this.emailDuplicateValidator.bind(this)]),
      confirmCode: new FormControl('', [Validators.required, this.confirmCode.bind(this)]),
      birthday: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('(0|84)\\d{9}')], [this.phoneDuplicateValidator.bind(this)]),
      identity: new FormControl('', [Validators.required, Validators.pattern('\\d{9}(\\d{3})?')],
        [this.identityDuplicateValidator.bind(this)]),
      address: new FormControl('', [Validators.required]),
      avatar: new FormControl(this.imgSrc, [Validators.required]),
      checkbox: new FormControl(false, [Validators.requiredTrue]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required])
    });
  }

  confirmCode(control: FormControl) {
    if (this.code === control.value) {
      this.message = '';
      return null;
    }
    return { code: control.value };
  }

  sendEmail() {
    if (this.email.valid) {
      this.dialog.open(MatLoadingDiaComponent, { panelClass: 'loading-dialog', position: { top: '0', left: '17%' }, disableClose: true });
      this.accountService.getCodeConfirm(this.email.value).subscribe(data => {
        this.code = data.jwtToken;
        this.message = 'Đã gửi mã xác nhận đến email!';
        this.confirmCodeForm.setErrors({ code: '' });
        this.dialog.closeAll();
      },() => {
        this.message = 'Đã có lỗi xảy ra!';
        this.dialog.closeAll();
      });
    } else {
      this.message = 'Vui lòng nhập đúng email ròi nhấn gửi mã!';
    }
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
    if (this.form){
      this.confirmCodeForm.setErrors({ code: '' });
    }
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
        const config = new MatDialogConfig();
        config.position = { top: '5%' };
        // duong
        const room = new Room(this.accountName.value, userNew, 0);
        this.chatService.addNewRoom(room);
        this.dialog.open(MatRegisDiaComponent, config);
        this.form.reset();
        this.code = '';
        this.imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaDVphQLEDiL6PDlQULiIyHHt_s8eeBdCiw&usqp=CAU';
        this.selectedImage = null;
        this.message = '';
      }
    });
  }

  submitAvatar() {
    if (this.selectedImage !== null) {
      const filePath = `avatar/${this.selectedImage.name}/${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgSrc = url;
            this.avatar.setValue(url);
            this.dialog.closeAll();
          });
        })
      ).subscribe(() => { }, () => this.dialog.closeAll()
      );
    }
  }

  changeImage(event) {
    this.avatar.setValue('');
    this.dialog.open(MatLoadingDiaComponent, { panelClass: 'loading-dialog', position: { top: '0', left: '17%' }, disableClose: true });
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      this.submitAvatar();
    } else {
      this.imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaDVphQLEDiL6PDlQULiIyHHt_s8eeBdCiw&usqp=CAU';
      this.avatar.setValue(this.imgSrc);
      this.selectedImage = null;
      this.dialog.closeAll();
    }
  }

  changeProvince(provinceId: number) {
    this.district.setValue('');
    const provinceSelect = this.provinceList.find(e => e.province_id === provinceId);
    this.province.setValue(provinceSelect.province_name);
    this.accountService.getAllDistrictByProvince(provinceId).subscribe(data => {
      this.districtList = data.results;
      this.changeDistrict(this.districtList[0].district_id);
    });
  }

  changeDistrict(districtId: number) {
    this.ward.setValue('');
    const districtSelect = this.districtList.find(e => e.district_id === districtId);
    this.district.setValue(districtSelect.district_name);
    this.accountService.getAllWardByDistrict(districtId).subscribe(data => {
      this.wardList = data.results;
      if (this.wardList === undefined || this.wardList.length === 0) {
        this.ward.setValue('not available');
        this.address.setValue(this.district.value + ' ' + this.province.value);
      } else {
        this.changeWard(this.wardList[0].ward_id);
      }
    });
  }

  changeWard(wardId: number) {
    const wardSelect = this.wardList.find(e => e.ward_id === wardId);
    this.ward.setValue(wardSelect.ward_name);
    this.address.setValue(this.ward.value + ' ' + this.district.value + ' ' + this.province.value);
  }

  show() {
    if ($('.show').hasClass('fa-eye')) {
      $('.show').removeClass('fa-eye');
      $('.show').addClass('fa-eye-slash');
      $('.password').attr('type', 'text');
    } else {
      $('.show').addClass('fa-eye');
      $('.show').removeClass('fa-eye-slash');
      $('.password').attr('type', 'password');
    }
  }

  changeShow() {
    let value = '';
    if ($('#password').val() === '') {
      value = $('#passwordConfirm').val() as string;
    } else {
      value = $('#password').val() as string;
    }
    if (value != '') {
      $('.show').css('visibility', 'visible');
      $('.password').css('padding-right', '3.5rem');
    } else {
      $('.show').css('visibility', 'hidden');
      $('.password').css('padding-right', '.75rem');
    }
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
  get province() {
    return this.form.get('province');
  }
  get district() {
    return this.form.get('district');
  }
  get ward() {
    return this.form.get('ward');
  }
  get avatar() {
    return this.form.get('avatar');
  }
  get confirmCodeForm() {
    return this.form.get('confirmCode');
  }
}
