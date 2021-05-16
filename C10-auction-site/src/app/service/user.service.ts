import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from './authentication/account-service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080';

  public httpOptions: any;

  baseUrl = 'http://localhost:8080/api/account/admin/';

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.httpOptions = this.accountService.httpOptions;
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'user-list', this.httpOptions);
  }

  lockUserById(userId: number): Observable<any> {

    return this.http.put(this.baseUrl + 'lock-user', userId, this.httpOptions);
  }

  unlockUserById(userId: number): Observable<any> {

    return this.http.put(this.baseUrl + 'unlock-user', userId, this.httpOptions);
  }

  searchUser(userName, address, userEmail): Observable<any> {
    console.log(userName);
    return this.http.get(this.baseUrl + 'search-user?userName=' + userName + ''
      + '&address=' + address + '' + '&userEmail=' + userEmail, this.httpOptions);
  }

  getUserByDate(month, year): Observable<any> {
    return this.http.get(this.baseUrl + 'user-chart?month=' + month + '' +
      '&year=' + year, this.httpOptions);
  }

  public updateUser(userId: number, user): Observable<any> {
    return this.http.put(this.API_URL + '/edit/' + userId, user , this.httpOptions);
  }
}
