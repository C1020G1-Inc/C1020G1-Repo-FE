import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  constructor(public database: AngularFireDatabase) {
  }

  getListAuction(productId): Observable<any> {
    return this.database.object('/auction/progress/' + productId).valueChanges();
  }

  getNotifyByAccount(accountId): Observable<any> {
    return this.database.object('/notification/' + accountId).valueChanges();
  }
}
