/**
 * By BOUHSEN RAFIQ
 * project: PFF TrackCovid19
 * User service.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Marker} from '../models/marker';

const url = 'http://localhost:7777/api/marker'; // json-server url

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

/**
 * @description injectable marker service
 * @class [export MarkerService]
 */
export class MarkerService {
  /**
   * @description constructor where HttpClient service is injected
   * @param http is an instnace of HttpClient
   */
  constructor(private http: HttpClient) { }
  /**
   * @description get markers using json-server as a REST web service
   * @method {getMarker}
   */
  getMarker() {
    return this.http.get<Marker>(url);
  }
}

