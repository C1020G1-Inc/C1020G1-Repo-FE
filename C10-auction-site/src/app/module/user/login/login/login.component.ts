import { AuthenticationService } from './../../../../service/authentication/authentication-service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../../../service/authentication/token-storage';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import JwtRequest from 'src/app/service/authentication/JwtRequest';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { JwtResponse } from 'src/app/service/authentication/JwtRespone';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * @author PhinNL
 * login
 */
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  socialUser: SocialUser;
  accountNameZ = '';
  isLocked = false;
  isCorrect = true;
  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private authService: SocialAuthService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Đăng nhập');
    if (this.tokenStorage.isLogged()) {
      if (this.tokenStorage.getRoles()[0] === 'MEMBER') {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/admin/product-management/list');
      }
    }
    this.formLogin = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{1,5}[a-zA-Z0-9]{7,15}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
      remmember: new FormControl(false)
    });
  }

  clearBool() {
    this.isCorrect = true;
    this.isLocked = false;
  }

  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }

  login() {
    this.clearBool();
    this.authenticationService.sendLogin(new JwtRequest(this.accountName.value, this.password.value)).subscribe(data => {
      if (data.jwtToken === null) {
        this.accountNameZ = data.account.accountName;
        this.isLocked = true;
      } else {
        if (data.jwtToken === 'INVALID_CREDENTIALS') {
          this.isCorrect = false;
        } else {
          this.tokenStorage.saveData(data, this.remember.value);
          window.location.reload();
        }
      }
    });
  }

  signInWithGoogle(): void {
    this.clearBool();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const tokenGoogle = new JwtResponse(this.socialUser.idToken);
      this.authenticationService.google(tokenGoogle).subscribe(req => {
        if (req !== null) {
          if (req.jwtToken === null) {
            this.accountNameZ = req.account.accountName;
            this.isLocked = true;
          } else if (req.jwtToken === '') {
            this.tokenStorage.saveAccountStorage(req.account);
            this.router.navigateByUrl('/register');
          } else {
            this.tokenStorage.saveData(req, true);
            window.location.reload();
          }
        }
      },
        error => {
          this.logout();
        });
    }).catch(
      err => {
        console.log(err);
      }
    );
  }

  signInWithFB(): void {
    this.clearBool();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(data => {
        this.socialUser = data;
        const tokenFacebook = new JwtResponse(this.socialUser.authToken);
        this.authenticationService.facebook(tokenFacebook).subscribe(req => {
          if (req.jwtToken === null) {
            this.accountNameZ = req.account.accountName;
            this.isLocked = true;
          } else if (req.jwtToken === '') {
            this.tokenStorage.saveAccountStorage(req.account);
            this.router.navigateByUrl('/register');
          } else {
            this.tokenStorage.saveData(req, true);
            window.location.reload();
          }
        },
          error => {
            this.logout();
          }
        );
      }).catch(
        err => { }
      );
  }

  get remember() {
    return this.formLogin.get('remmember');
  }

  get accountName() {
    return this.formLogin.get('accountName');
  }
  get password() {
    return this.formLogin.get('password');
  }
}
