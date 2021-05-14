import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { AuctionModule } from './auction/auction.module';
import { LoginModule } from './login/login.module';
import { HomePageModule } from './home-page/home-page.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {UserChatComponent} from './user-chat/user-chat/user-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, UserChatComponent],
  exports: [
    UserChatComponent
  ],
  imports: [
    CommonModule,
    ProfileModule,
    AuctionModule,
    LoginModule,
    HomePageModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
