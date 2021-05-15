import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { AuctionModule } from './auction/auction.module';
import { LoginModule } from './login/login.module';
import { HomePageModule } from './home-page/home-page.module';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import {UserChatComponent} from './user-chat/user-chat/user-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';



@NgModule({
  declarations: [ FooterComponent, UserChatComponent, FooterComponent],
  exports: [
    UserChatComponent
  ],
  imports: [
    CommonModule,
    ProfileModule,
    AuctionModule,
    LoginModule,
    HomePageModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
