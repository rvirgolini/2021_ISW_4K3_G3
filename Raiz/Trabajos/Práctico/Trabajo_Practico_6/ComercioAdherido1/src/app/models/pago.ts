export interface PagoTarjeta{
    montoTarjeta: number,
    numeroDeTarjeta: number,
    nombreTitular: string,
    apellidoTitular: string,
    fechaNacimiento: Date,
    codigoSeguridad: number,

}

export interface PagoEfectivo{
    montoEfectivo: number,
}