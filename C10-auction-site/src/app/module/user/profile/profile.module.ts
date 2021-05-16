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
import {HeaderFooterModule} from '../header-footer/header-footer.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ViewProfileComponent, UpdateProfileComponent, HistoryRegisterProductComponent,
    HistoryAuctionProductComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderFooterModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HistoryRegisterProductComponent,
    HistoryAuctionProductComponent
  ],
})
export class ProfileModule {
}
