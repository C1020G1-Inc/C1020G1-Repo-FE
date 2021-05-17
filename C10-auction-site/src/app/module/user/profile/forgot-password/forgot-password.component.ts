import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import {LoadingComponent} from '../../../loading/loading/loading.component';
import {ProductService} from "../../../../service/product/product.service";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  recoverForm: FormGroup;

  notification: string;

  checkSuccess: string;

  constructor(private form: FormBuilder,
              private accountService: ProductService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.recoverForm = this.form.group({
      accountEmail: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.openLoading('!!! Chúng tôi vừa gửi cho bạn mật khẩu mới qua email!!');
    this.accountService.recoverPage(this.recoverForm.get('accountEmail').value).subscribe(data => {
        this.checkSuccess = 'success';
        this.dialog.closeAll();
      },
      error => {
        this.checkSuccess = 'false';

      });
  }


  openLoading(notification) {
    this.notification = notification
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
  }

}
