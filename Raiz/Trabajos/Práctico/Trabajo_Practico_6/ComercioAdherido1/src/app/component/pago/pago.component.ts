import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { PagoEfectivo, PagoTarjeta } from 'src/app/models/pago';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { MatDialog } from '@angular/material/dialog';
import { ResumenComponent } from '../resumen/resumen.component';
import { Resumen } from 'src/app/models/resumen';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  @Input() datosEnviadosTipoPago: string;
  @Input() datosEnviados: Pedido = {
    descripcionProducto: "",
    ciudadComercio: "",
    calleComercio: "",
    numeroComercio: "",
    detalleComercio: "",
    ciudadCliente: "",
    calleCliente: "",
    numeroCliente: "",
    detalleCliente: "",
    fechaPedido: "",
    metodoPago: "",
  };
   regex = /^4(\d\s?){14,15}$/
  datosResumen: Resumen | undefined;
  pagoTarjetaForm: FormGroup;
  pagoEfectivoForm: FormGroup;
  constructor(private router: Router
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute
    ,public dialog: MatDialog
    ) {
    this.pagoTarjetaForm = this.formBuilder.group({
      montoTarjeta: ['5000'],
      numeroDeTarjeta: [ '' 
      , [Validators.required, Validators.pattern(this.regex)]],
      nombreTitular: [ ''],
      apellidoTitular: [ '' ],
      fechaNacimiento: [ '' ],
      codigoSeguridad: [ '' ]
      
    });
    this.pagoTarjetaForm.controls['montoTarjeta'].disable();
    this.pagoEfectivoForm = this.formBuilder.group({
      montoEfectivo: ['', Validators.required ],
    });
   }
  
  
  ngOnInit(): void {
    var pedido = this.route.snapshot.paramMap.get('value')
    console.log(pedido)
    console.log(this.datosEnviadosTipoPago)
  }
  get numeroDeTarjeta(){
    return this.pagoTarjetaForm.get("numeroDeTarjeta") as FormControl
  }
  get montoEfectivo(){
     return this.pagoEfectivoForm.get("montoEfectivo")  as FormControl
    
  }
  onSubmitEfectivo(value: PagoEfectivo){
    console.log("Efectivo",this.pagoEfectivoForm.value);
      //this.router.navigate(['/']);
    
  }

  onSubmitTarjeta(value: PagoTarjeta) {
    console.log("Tarjeta",this.pagoTarjetaForm.value);
      
   
      
    
    this.datosResumen = {
      producto: this.datosEnviados?.descripcionProducto,
      detalleUbicacionComercio: this.datosEnviados?.detalleComercio,
      ciudadComercio: this.datosEnviados.ciudadComercio,
      calleComercio: this.datosEnviados.calleComercio,
      numeroComercio:  this.datosEnviados.numeroComercio,
      ciudadCliente: this.datosEnviados.ciudadCliente,
      calleCliente: this.datosEnviados.calleCliente,
      numeroCliente:  this.datosEnviados.numeroCliente,
      detalleUbicacionCliente: this.datosEnviados.detalleCliente,
      formaDePago: this.datosEnviados.metodoPago,
      fechaPedido: this.datosEnviados.fechaPedido,
      monto: value.montoTarjeta,
      numeroDeTarjeta: value.numeroDeTarjeta,
      nombreTitular: value.nombreTitular,
      apellidoTitular: value.apellidoTitular,
    }
    const dialoRef = this.dialog.open(ResumenComponent, {data: this.datosResumen});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
    
    

    
    console.log( value)
  }
  openDialog(): void {
    const dialoRef = this.dialog.open(ResumenComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
    // this.dialog.closeAll();
  }

}
