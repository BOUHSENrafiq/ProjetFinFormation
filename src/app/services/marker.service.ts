/**
 * By BOUHSEN RAFIQ
 * project: PFF TrackCovid19
 * User service.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Marker} from '../models/marker';

const url = 'http://localhost:3000/marker'; // json-server url
@Injectable({
  providedIn: 'root'
})
/**
 * injectable marker service
 * @class [export MarkerService]
 */
export class MarkerService {

  constructor(private http: HttpClient) { }

  /**
   * get markers using json-server as a REST web service
   * @method {getMarker}
   */
  getMarker() {
    return this.http.get<Marker>(url);
  }
}

