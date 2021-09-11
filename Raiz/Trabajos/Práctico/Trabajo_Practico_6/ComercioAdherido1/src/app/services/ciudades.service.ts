import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudade';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private url: string = "https://k3-isw-tp6-default-rtdb.firebaseio.com/ciudades.json";
  constructor(private http:HttpClient) { }

  getCiudades() : Observable<any>
  {
      return this.http.get(this.url)
  }
}
