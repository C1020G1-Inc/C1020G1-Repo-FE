import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChatComponent } from './admin-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatRoomComponent} from './chat-room/chat-room.component';


@NgModule({
  declarations: [AdminChatComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminChatModule { }
