import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../../../service/user.service";
import {TokenStorageService} from "../../../../service/authentication/token-storage";
import {Account} from "../../../../model/Account";
import {Title} from "@angular/platform-browser";
import {AccountService} from '../../../../service/authentication/account-service';
import {RegisDistrict, RegisProvince, RegisWard} from "../../../../service/authentication/account-province";
import {finalize} from "rxjs/operators";
import {MatLoadingDiaComponent} from "../../material/mat-loading-dia/mat-loading-dia.component";
import {AngularFireStorage} from "@angular/fire/storage";
import {MatDialog} from "@angular/material/dialog";
import {LoadingComponent} from "../../../admin/product-management/loading/loading.component";
import Swal from "sweetalert2";
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
  provinceList: RegisProvince[];
  districtList: RegisDistrict[];
  wardList: RegisWard[];
  public minDate = new Date(1921,0, 1);
  public maxDate = new Date(2003, 1, 1);
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    public userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public tokenService: TokenStorageService,
    private title: Title,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.accountService.findAccount(this.tokenService.getAccount().accountId).subscribe(data =>{
      this.accountLogin = data;
    });
    this.formEditUser = this.formBuilder.group({
      userId: [''],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40), this.nameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      birthday: ['', [Validators.required]],
      identity: ['', [Validators.required, Validators.pattern('\\d{9}')]],
      phone: ['', [Validators.required, Validators.pattern('(0|84)\\d{9}')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      avatar: [''],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
    });
    this.setValueForm();
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
  }
  setValueForm() {
    this.activatedRoute.params.subscribe(data => {
      this.accountId = data.id;
      this.accountService.findAccount(this.accountId).subscribe(data1 => {
        this.formEditUser.patchValue(data1);
        this.formEditUser.patchValue(data1.user);
        this.formEditUser.controls.birthday.setValue
        (data1.user.birthday = new Date(new Date(data1.user.birthday).getTime() + 7*60*60*1000).toISOString().slice(0,10));
        console.log(this.formEditUser.value);
      });
    });
  }
  updateUser() {
    this.openLoading();
    if (this.accountLogin.email != this.formEditUser.value.email){
      this.accountService.updateEmail(this.accountLogin.email, this.formEditUser.value.email).subscribe();
    }
    this.userService.updateUser(this.accountId, this.formEditUser.value).subscribe(data => {
      this.accountLogin.user = this.formEditUser.value;
      this.tokenService.saveAccountStorage(this.accountLogin);
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
  get province() {
    return this.formEditUser.get('province');
  }
  get district() {
    return this.formEditUser.get('district');
  }
  get ward() {
    return this.formEditUser.get('ward');
  }
  get avatar() {
    return this.formEditUser.get('avatar');
  }
  //validate tên tiếng việt có dấu ( không có số và kí tự đặc biệt )
  nameValidator(control: FormGroup) {
    return /^([\p{Lu}]|([\p{Lu}][\p{Ll}]{1,8}))(\s([\p{Lu}]|[\p{Lu}][\p{Ll}]{1,10})){0,5}$/u.test(control.value) ? null : { userName: control.value };
  }
  resetForm() {
    this.setValueForm();
  }
  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '400px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
      this.showSuccessAlert();
    }, 3000);
  }
  showSuccessAlert() {
    Swal.fire('Chỉnh sửa thành công !!', '', 'success')
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
}
