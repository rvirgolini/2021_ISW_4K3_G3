import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodosPagoService {

  private url: string = "https://k3-isw-tp6-default-rtdb.firebaseio.com/metodosPago.json";
  constructor(private http:HttpClient) { }

  getMetodosPago(): Observable<any>
  {
    return this.http.get(`${this.url}`);
  }
}
