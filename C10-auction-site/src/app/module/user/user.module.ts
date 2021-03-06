import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { UserChatModule } from './user-chat/user-chat.module';
import { AuctionModule } from './auction/auction.module';
import { LoginModule } from './login/login.module';
import { HomePageModule } from './home-page/home-page.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ProfileModule,
    UserChatModule,
    AuctionModule,
    LoginModule,
    HomePageModule
  ]
})
export class UserModule { }
