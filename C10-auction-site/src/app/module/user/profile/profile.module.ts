import { UserModule } from './../user.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {HistoryRegisterProductComponent} from './history-register-product/history-register-product.component';
import {HistoryAuctionProductComponent} from './history-auction-product/history-auction-product.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {MaterialModule} from '../material/material.module';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [ViewProfileComponent, UpdateProfileComponent, HistoryRegisterProductComponent,
    HistoryAuctionProductComponent, RegisterComponent, ForgotPasswordComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ProfileModule { }
