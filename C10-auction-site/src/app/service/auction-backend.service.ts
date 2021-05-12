import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionBackendService {
  public API_PRODUCT = 'http://localhost:8080/api/product';
  public API_AUCTION = 'http://localhost:8080/api/auction';

  constructor(public http: HttpClient) {
  }

  public getProductDetail(productId): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/detail/' + productId);
  }
}
