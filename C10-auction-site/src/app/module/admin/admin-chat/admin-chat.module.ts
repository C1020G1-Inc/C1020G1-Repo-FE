import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChatComponent } from './admin-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {LeftSideBarModule} from '../left-side-bar/left-side-bar.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AdminChatComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeftSideBarModule,
    RouterModule,
  ]
})
export class AdminChatModule { }
