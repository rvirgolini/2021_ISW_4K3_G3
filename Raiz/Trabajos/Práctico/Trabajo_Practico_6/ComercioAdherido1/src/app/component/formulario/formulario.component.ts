
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido';
import { Router } from '@angular/router';
import { Ciudad} from 'src/app/models/ciudade';
import { ModoPago, ModoPagos } from 'src/app/models/modoPago';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { MetodosPagoService } from 'src/app/services/metodos-pago.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Direccion } from 'src/app/models/direccion';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  ciudadesDisponibles: Ciudad[] = [];
  modosPagoDisponible: ModoPago[] = [];
  datosEnviarTipoPagos: string = "";
  datosEnviarDB: Pedido = 
  {
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
  }

  paginaFormulario = 1;

  entregaInmediata = false;
  pruductoOK = "";
  direccionOk = "";

  imagenProducto: File | null = null;

  ciudadComercio: Ciudad = { nombre: " ", latitud: -31.413972040086794, longitud: -64.18537430820507 };
  ciudadCliente: Ciudad = { nombre: " ", latitud: -31.413972040086794, longitud: -64.18537430820507 };

  pedidoForm: FormGroup;  
  constructor(private router: Router
    , private formBuilder: FormBuilder
    , private ciudadesService: CiudadesService
    , private metodosPagoService: MetodosPagoService
    , private pedidosService: PedidosService
    , private storage: AngularFireStorage
    ) { 
      let docDate = 'Jun 15, 2015, 21:43:11 UTC'; //You'll want to change this to UTC or it can mess up your date.
    this.pedidoForm = this.formBuilder.group({
      producto: ['', [Validators.required]],
      ciudadComercio: ['', [Validators.required]],
      calleComercio: [ '', [Validators.required]],
      numeroComercio: [ '', [Validators.required]],
      detalleComercio: ['', [Validators.required]],
      ciudadCliente: ['', [Validators.required]],
      calleCliente: [ '', [Validators.required]],
      numeroCliente: [ '', [Validators.required]],
      detalleCliente: ['', [Validators.required]],
      formaDePago: ['', [Validators.required]],
      fechaPedido: ['', [Validators.required]]
    });
    
    this.ciudadesService.getCiudades().subscribe(resp => {
      Object.keys(resp).
      forEach(key => this.ciudadesDisponibles.push({
                                                nombre: resp[key].nombre,
                                                latitud: resp[key].latitud,
                                                longitud: resp[key].longitud
                                                }));
    });

    this.metodosPagoService.getMetodosPago().subscribe(resp => {
      console.log(resp)
      Object.keys(resp)
      .filter(key => resp[key].activo)
      .forEach(activeKey =>this.modosPagoDisponible.push({
                                                      modo: resp[activeKey].nombre
                                                      })
      )
    });
  }

  ngOnInit(): void {
  }
  
 enviarHijo(): void{
  this.datosEnviarTipoPagos = this.pedidoForm.value.formaDePago;
  console.log(this.datosEnviarTipoPagos)
 }
  onSubmit(value: Pedido): void {
    
    if(!this.pedidoForm.valid) return;
 
    let datosEnviarDB:Pedido = {
      descripcionProducto: this.pedidoForm.value.producto,
      ciudadComercio: this.pedidoForm.value.ciudadComercio,
      calleComercio: this.pedidoForm.value.calleComercio,
      numeroComercio: this.pedidoForm.value.numeroComercio,
      detalleComercio: this.pedidoForm.value.detalleComercio,
      ciudadCliente: this.pedidoForm.value.ciudadCliente,
      calleCliente: this.pedidoForm.value.calleCliente,
      numeroCliente: this.pedidoForm.value.numeroCliente,
      detalleCliente: this.pedidoForm.value.detalleComercio,
      fechaPedido: this.pedidoForm.value.fechaPedido,
      metodoPago: this.pedidoForm.value.formaDePago,
    }
    

    this.pedidosService.postPedido(datosEnviarDB).subscribe(resp => console.log(resp));

    if(this.imagenProducto != null)
    {
      this.storage.upload(`${this.imagenProducto?.name}`, this.imagenProducto);    
    }
  }
  onChangeDireccion($target: any){
      this.direccionOk = $target.value;
  }
  onChangeProducto($target:any){
        this.pruductoOK = $target.value;
  }
  onChange($target:any)
  {
    if($target === null) return;

    let ciudad: Ciudad | undefined = this.ciudadesDisponibles
                                    .find(ciudad => ciudad.nombre == $target.value);
    if(ciudad === undefined) return;
    
    if(this.paginaFormulario == 2)
    {
      this.ciudadComercio = ciudad;
      return;
    } 
    this.ciudadCliente = ciudad;
  }

  checkOnChange($event:any)
  {
    if($event.target == null) return;

    this.entregaInmediata = $event.target.checked;
    let fechaControl = this.pedidoForm.controls['fechaPedido'];
    if(this.entregaInmediata)
    {
      fechaControl.setValue(this.currentDate());
      fechaControl.disable();
      return;
    }
    fechaControl.setValue("");
    fechaControl.enable();
  }

  onFileSelected(eventTarget : any)
  {
    if(eventTarget == null) return;
    if(eventTarget.files.item(0).size > 5*1024*1024){
      alert("La imagen no debe superar los 5mb");
      return;
    }
    this.imagenProducto = eventTarget.files.item(0);
  }

  onMapClick($event: Direccion): void {
    let ciudad = this.getCiudad($event.ciudad);
    let calle = $event.calle;
    let numero = $event.numero;

    let controles = this.pedidoForm.controls;
    if(this.paginaFormulario == 2)
    {
      controles.ciudadComercio.setValue(ciudad);
      controles.calleComercio.setValue(calle);
      controles.numeroComercio.setValue(numero);
      return;
    }
    controles.ciudadCliente.setValue(ciudad);
    controles.calleCliente.setValue(calle);
    controles.numeroCliente.setValue(numero);
  }


  siguientePagina(): void {
    this.paginaFormulario++;
  }
  get producto(){
    return this.pedidoForm.get("producto")  as FormControl
   
 }
 get montoEfectivo(){
  return this.pedidoForm.get("detalleComercio")  as FormControl
 
}
  anteriorPagina(): void {
    if(this.paginaFormulario>1)
      this.paginaFormulario--;
      
  }

  pagaConTarjeta() : boolean
  {
    let metodoPago:string = this.pedidoForm.value.formaDePago;

    return metodoPago.includes("tarjeta");
  }

  private getCiudad(nombreResultado: string) : string
  {
    let clean = this.cleanString(nombreResultado);
    let ciudadEncontrada = this.ciudadesDisponibles
                          .find(ciudad => {
                            let ciudadLimpia = this.cleanString(ciudad.nombre);
                            return ciudadLimpia.includes(clean);
                          });
    return ciudadEncontrada === undefined? "" : ciudadEncontrada.nombre;
  }

  //Saca los acentos porque habia un problema al comparar jesús maría
  private cleanString(toClean: string) : string
  {
    return toClean.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
  }

  private currentDate() : string
  {
    let ISODate = new Date().toISOString();
    let date = ISODate.substring(0,10);
    let time = ISODate.substring(11,19);
    
    return `${date} ${time}`;
  }
}


