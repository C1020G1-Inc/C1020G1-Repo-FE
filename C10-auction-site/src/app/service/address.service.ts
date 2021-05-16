import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './authentication/token-storage';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private BASE_URL = 'http://localhost:8080/api/address';
  public httpOptions : any;
  constructor(public http: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  /**
   * Author : CaoLPT
   * Get all provinces from db
   */
  public getAllProvinces(): Observable<any> {
    return this.http.get(this.BASE_URL + '/' + 'province', this.httpOptions);
  }

  /**
   * Author : CaoLPT
   * Get list districts by province_id from db
   */
  public getDistrictByProvince(provinceId): Observable<any> {
    return this.http.get(this.BASE_URL + '/district/' + provinceId, this.httpOptions);
  }

  /**
   * Author : CaoLPT
   * Get list wards by district_id from db
   */
  public getWardByDistrict(districtId): Observable<any> {
    return this.http.get(this.BASE_URL + '/ward/' + districtId, this.httpOptions);
  }
}
