import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
