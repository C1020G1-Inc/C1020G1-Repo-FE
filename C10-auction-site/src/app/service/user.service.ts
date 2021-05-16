import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./authentication/token-storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080';

  public httpOptions: any;

  constructor(public http: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public updateUser(userId: number, user): Observable<any> {
    return this.http.put(this.API_URL + '/edit/' + userId, user , this.httpOptions);
  }

}
