import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { ErrorComponent } from './module/error/error.component';
import {UserManagementModule} from './module/admin/user-management/user-management.module';
import {UserModule} from './module/user/user.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {UserChatComponent} from './module/user/user-chat/user-chat/user-chat.component';
=======
import {HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {UserModule} from './module/user/user.module';
import {ProfileModule} from './module/user/profile/profile.module';
import {NgxLoadingModule} from 'ngx-loading';
import {AngularFireDatabaseModule} from '@angular/fire/database';
>>>>>>> 8177de4638d0caa4f7d18ea55c3333224ffcd0d5

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    ErrorComponent,
=======
>>>>>>> 8177de4638d0caa4f7d18ea55c3333224ffcd0d5
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireStorageModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
<<<<<<< HEAD
    AngularFireStorageModule,
    UserManagementModule,
    UserModule,
    AngularFireDatabaseModule,
=======
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    AngularFireDatabaseModule,
    SocialLoginModule,
    UserModule,
    ProfileModule
>>>>>>> 8177de4638d0caa4f7d18ea55c3333224ffcd0d5
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '158735927407-14hrjk7maad35dvmc0uull3g9lj6n66a.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('289085412758837')
        }
      ]
    } as SocialAuthServiceConfig,
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
