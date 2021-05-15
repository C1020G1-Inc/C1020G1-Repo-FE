import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {TokenStorageService} from './token-storage';



const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
/**
 * @author PhinNL
 */
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService) { }

  intercept(req, next) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        setHeaders: {
          // tslint:disable-next-line:object-literal-key-quotes
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
      });
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService , multi: true }
];
