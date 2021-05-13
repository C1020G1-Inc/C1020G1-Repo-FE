import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<any> {
    return this.http.get('http://localhost:8080/admin/user-list');
  }

  deleteUserById(userId: number): Observable<any> {
    // @ts-ignore
    return this.http.put('http://localhost:8080/admin/delete-user/' + userId);
  }

  lockUserById(userId: number): Observable<any> {
    // @ts-ignore
    return this.http.put('http://localhost:8080/admin/lock-user/' + userId);
  }

  unlockUserById(userId: number): Observable<any> {
    // @ts-ignore
    return this.http.put('http://localhost:8080/admin/unlock-user/' + userId);
  }

  searchUser(userName, userId, address, userEmail): Observable<any> {
    console.log(userName);
    return this.http.get('http://localhost:8080/admin/search-user?userName=' + userName + ''
      + '&userId=' + userId + '' + '&address=' + address + '' + '&userEmail=' + userEmail);
  }

  getUserByDate(month, year): Observable<any> {
    return this.http.get('http://localhost:8080/admin/user-chart?month=' + month + '' +
      '&year=' + year);
  }
}
