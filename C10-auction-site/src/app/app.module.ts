import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './module/loading/loading/loading.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import { ErrorComponent } from './module/error/error.component';
import {UserManagementModule} from './module/admin/user-management/user-management.module';
import {UserModule} from './module/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule ,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    UserManagementModule,
    UserModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
