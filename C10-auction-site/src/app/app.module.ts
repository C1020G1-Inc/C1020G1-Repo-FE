import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './module/user/user.module';
import {ProfileModule} from './module/user/profile/profile.module';


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        UserModule,
        ProfileModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
