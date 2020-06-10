import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  /**
   * @description where HttpClient service is injected
   * @param http is an instnace of HttpClient
   */
  constructor(private http: HttpClient) { }
  /**
   * @description get today statistics
   */
  getToDayStat(): Observable<any>{
    const url = 'https://disease.sh/v2/countries/morocco'; // API
    return this.http.get<any>(url);
  }
  /**
   * @description get historical data
   */
  getHistoricalStat(): Observable<any>{
    const url = 'https://disease.sh/v2/historical/morocco'; // API
    return this.http.get<any>(url);
  }
}
