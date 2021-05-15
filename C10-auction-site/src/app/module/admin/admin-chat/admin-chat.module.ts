import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatRoomComponent} from './admin-chat/chat-room/chat-room.component';


@NgModule({
  declarations: [AdminChatComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminChatModule { }
