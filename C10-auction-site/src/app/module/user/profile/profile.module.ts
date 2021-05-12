import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { HistoryRegisterProductComponent } from './history-register-product/history-register-product.component';
import { HistoryAuctionProductComponent } from './history-auction-product/history-auction-product.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ViewProfileComponent, UpdateProfileComponent, HistoryRegisterProductComponent,
    HistoryAuctionProductComponent, RegisterComponent, ForgotPasswordComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class ProfileModule { }
