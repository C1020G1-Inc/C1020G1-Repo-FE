import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {LoadingComponent} from './module/loading/loading/loading.component';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatDialogModule} from '@angular/material/dialog';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {UserManagementModule} from './module/admin/user-management/user-management.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './module/user/user.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgxLoadingModule} from 'ngx-loading';
import {ProfileModule} from './module/user/profile/profile.module';
import {DatePipe} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HeaderFooterModule} from './module/user/header-footer/header-footer.module';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
    imports: [
        BrowserModule,
        SocialLoginModule,
        HttpClientModule,
        AngularFireStorageModule,
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        MatSnackBarModule,
        UserManagementModule,
        UserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        NgxPaginationModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        NgxLoadingModule.forRoot({}),
        AngularFireDatabaseModule,
        SocialLoginModule,
        UserModule,
        ProfileModule,
        AppRoutingModule,
        HeaderFooterModule,
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
