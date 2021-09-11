import { Ciudad } from "./ciudade";
import { ModoPago } from "./modoPago";

export interface Pedido {
    producto: string,
    detalleUbicacionComercio: string,
    ciudadComercio: string,
    calleComercio: string,
    numeroComercio:  number,
    ciudadCliente: string,
    calleCliente: string,
    numeroCliente:  number,
    detalleUbicacionCliente: string,
    formaDePago: string,
    fechaPedido: string

}

