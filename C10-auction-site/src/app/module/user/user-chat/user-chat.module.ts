import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChatComponent } from './user-chat/user-chat.component';



@NgModule({
    declarations: [UserChatComponent],
    exports: [
        UserChatComponent
    ],
    imports: [
        CommonModule
    ]
})
export class UserChatModule { }
