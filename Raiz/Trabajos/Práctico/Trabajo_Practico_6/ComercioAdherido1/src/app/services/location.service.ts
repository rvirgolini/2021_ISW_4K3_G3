import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpClientModule
  } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  resourceURL: string;
  apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'https://maps.googleapis.com/maps/api/geocode/json';
    this.apiKey = 'AIzaSyDJn4F2XB6c_-DAX5m9nmfjDTsT-v5UppY';
  }

  getLocationInfo(lat: number, lng: number): Observable<any> {
    let params = new HttpParams();
    let latlng = lat.toString() + ', ' + lng.toString();
    params = params.append("latlng", latlng);
    params = params.append("key", this.apiKey);

    return this.httpClient.get(this.resourceURL, {params})
  }
}
