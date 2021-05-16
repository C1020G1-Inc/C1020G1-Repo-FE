import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ErrorComponent} from './module/error/error.component';
import {LoadingComponent} from './module/loading/loading/loading.component';
import {BrowserModule} from '@angular/platform-browser';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {UserManagementModule} from './module/admin/user-management/user-management.module';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './module/user/user.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppRoutingModule} from './app-routing.module';
import {DatePipe} from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    UserManagementModule,
    UserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule,
    AngularFireDatabaseModule,
    AppRoutingModule,

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
export class AppModule {
}
