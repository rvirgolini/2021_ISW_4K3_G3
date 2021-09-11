
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido';
import { Router } from '@angular/router';
import { Ciudad, Ciudades } from 'src/app/models/ciudade';
import { ModoPago, ModoPagos } from 'src/app/models/modoPago';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  ciudadesComercio = Ciudades
  ciudadesClientes = Ciudades
  modosPago = ModoPagos
  verSeleccionPago: ModoPago  = {modo:""};
  verSeleccionCiudadComercio: Ciudad  = {nombre:""};
  verSeleccionCiudadCliente: Ciudad  = {nombre:""};

  public datosEnviar: Pedido = {producto: "",
  ciudadComercio: "",
    calleComercio: "",
    numeroComercio: 0,
    detalleUbicacionComercio: "",
    ciudadCliente: "",
    calleCliente: "",
    numeroCliente:  0,
    detalleUbicacionCliente: "",
    formaDePago: "",
    fechaPedido: ""
  }
  
  pedidoForm: FormGroup;
  constructor(private router: Router
    , private formBuilder: FormBuilder
    ) { 
    
    this.pedidoForm = this.formBuilder.group({
      producto: ['' ],
      ciudadComercio: [  ],
      calleComercio: [ ''],
      numeroComercio: [ '' ],
      detalleUbicacionComercio: [''],
      ciudadCliente: [  ],
      calleCliente: [ ''],
      numeroCliente: [ '' ],
      detalleUbicacionCliente: [''],
      formaDePago: [  ],
      fechaPedido: [ '' ]
      
    });
    
    
  }

  ngOnInit(): void {

  }
 
  onSubmit(value: Pedido) {

    console.log(this.pedidoForm.value);
 
    console.log(value)
    this.datosEnviar = {producto:value.calleCliente,
    ciudadComercio: value.ciudadComercio,
    calleComercio: value.calleComercio,
    numeroComercio: value.numeroComercio,
    detalleUbicacionComercio: value.detalleUbicacionComercio,
    ciudadCliente: value.ciudadCliente,
    calleCliente: value.calleCliente,
    numeroCliente:  value.numeroCliente,
    detalleUbicacionCliente: value.detalleUbicacionCliente,
    formaDePago: value.formaDePago,
    fechaPedido: value.fechaPedido
  }
    
  }
  

}


