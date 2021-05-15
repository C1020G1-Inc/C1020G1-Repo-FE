
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ProfileModule} from '../profile/profile.module';



@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileModule
  ]
})
export class LoginModule { }
