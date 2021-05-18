import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomePageModule} from './module/user/home-page/home-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomePageModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
