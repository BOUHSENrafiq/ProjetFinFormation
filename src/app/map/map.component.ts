import {Component, OnInit} from '@angular/core';
import {MarkerService} from '../services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.css' ]
})
export class MapComponent implements OnInit{
  // map options center and zoom.
  lat1 = 30.409902; // longitude
  lng1 = -9.548401; // latitude
  zoom = 19;

  lat = '';
  lng = '';
  marker: object;

  /**
   * @description injection of marker service
   * @param markerService instance of MarkerService
   */
  constructor(
    private markerService: MarkerService) { }

  ngOnInit(): void {
    // call the function getMarker from the markerService
    this.markerService.getMarker().subscribe(data => {
      this.marker = data;
      this.lng = data.lng;
      this.lat = data.lat;
       // show data on the console
      console.log(data);
    });
  }
}

