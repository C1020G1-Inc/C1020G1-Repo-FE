import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../service/product.service';
import {MatDialog} from '@angular/material/dialog';
import {LoadingComponent} from '../../../loading/loading/loading.component';


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
    this.accountService.recoverPage(this.recoverForm.get('accountEmail').value).subscribe(data => {
        const notification = 'We have sent a new password to your Gmail';
        this.openLoading(notification, 'success');

      },
      error => {
        this.openLoading(error.error.text, 'false');

      });
  }


  openLoading(notification, checkSuccess) {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
      this.notification = notification;
      this.checkSuccess = checkSuccess;
    }, 1000);



  }

}
