import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private url:string = "https://k3-isw-tp6-default-rtdb.firebaseio.com/pedidos.json";

  constructor(private http:HttpClient) { }

  public postPedido(pedido : Pedido) : Observable<any>
  {
    return this.http.post(this.url, pedido)
  }
}
