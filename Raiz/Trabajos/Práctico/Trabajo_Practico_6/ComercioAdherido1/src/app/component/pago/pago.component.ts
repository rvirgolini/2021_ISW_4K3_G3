import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pago } from 'src/app/models/pago';
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
  datosResumen: Resumen | undefined;
  pagoTarjetaForm: FormGroup;
  pagoEfectivoForm: FormGroup;
  constructor(private router: Router
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute
    ,public dialog: MatDialog
    ) {
    this.pagoTarjetaForm = this.formBuilder.group({
      monto: ['' ],
      numeroDeTarjeta: [ '' ],
      nombreTitular: [ ''],
      apellidoTitular: [ '' ],
      fechaNacimiento: [ '' ],
      codigoSeguridad: [ '' ]
      
    });
    this.pagoEfectivoForm = this.formBuilder.group({
      monto: ['' ],
    });
   }
  
  ngOnInit(): void {
    var pedido = this.route.snapshot.paramMap.get('value')
    console.log(pedido)
    console.log(this.datosEnviados)
  }
  onSubmit(value: Pago) {
    if(this.datosEnviados?.metodoPago == "Efectivo"){
      console.log("Efectivo",this.pagoEfectivoForm.value);
      this.router.navigate(['/']);
    }else{
      console.log("Tarjeta",this.pagoEfectivoForm.value);
    }
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
      monto: value.monto,
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
