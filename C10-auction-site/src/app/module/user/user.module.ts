import { HeaderFooterModule } from './header-footer/header-footer.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { UserChatModule } from './user-chat/user-chat.module';
import { AuctionModule } from './auction/auction.module';
import { LoginModule } from './login/login.module';
import { HomePageModule } from './home-page/home-page.module';
import {RouterModule} from "@angular/router";
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileModule,
    UserChatModule,
    AuctionModule,
    LoginModule,
    HomePageModule,
    RouterModule,
    MatDatepickerModule,
    HeaderFooterModule
  ],
  exports: [
  ],
})
export class UserModule {
}
