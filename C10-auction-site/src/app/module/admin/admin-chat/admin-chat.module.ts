import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChatComponent } from './admin-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {LeftSideBarModule} from '../left-side-bar/left-side-bar.module';
import {RouterModule} from '@angular/router';
import { ZoomComponent } from './zoom/zoom.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [AdminChatComponent, ChatRoomComponent, ZoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeftSideBarModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class AdminChatModule { }
