import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/user';

  constructor(public httpClient: HttpClient) {
  }

  public updateUser(userId: number, user): Observable<any> {
    return this.httpClient.put(this.API_URL + '/edit/' + userId, user);
  }

}
