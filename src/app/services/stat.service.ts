import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }
  /**
   * get today statistics
   */
  getToDayStat(): Observable<any>{
    const url = 'https://disease.sh/v2/countries/morocco'; // API
    return this.http.get<any>(url);
  }

  /**
   * get historical data
   */
  getHistoricalStat(): Observable<any>{
    const url = 'https://disease.sh/v2/historical/morocco'; // API
    return this.http.get<any>(url);
  }
}
