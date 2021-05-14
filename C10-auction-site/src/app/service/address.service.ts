import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {District, Province, Ward} from '../model/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private BASE_URL = 'http://localhost:8080/api/address';

  constructor(private http: HttpClient) {
  }

  /**
   * Author : CaoLPT
   * Get all provinces from db
   */
  public getAllProvinces(): Observable<any> {
    return this.http.get(this.BASE_URL + '/' + 'province');
  }

  /**
   * Author : CaoLPT
   * Get list districts by province_id from db
   */
  public getDistrictByProvince(provinceId): Observable<any> {
    return this.http.get(this.BASE_URL + '/district/' + provinceId);
  }

  /**
   * Author : CaoLPT
   * Get list wards by district_id from db
   */
  public getWardByDistrict(districtId): Observable<any> {
    return this.http.get(this.BASE_URL + '/ward/' + districtId);
  }
}
