import { Marker } from '../../models/marker';
import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { Direccion } from '../../models/direccion';
import {LocationService} from '../../services/location.service';
import { Ciudad } from 'src/app/models/ciudade';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() ciudad: Ciudad = {nombre: 'Capital', latitud: -31.413972040086794, longitud: -64.18537430820507};
  latitud: number = 0;
  longitud: number = 0;
  zoom: number = 1;
  
  @Output() direccion = new EventEmitter<Direccion>();

  marker: Marker = {
    lat: 0,
    lng: 0,
  };

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.zoom = 14;
  }

  ngOnChanges(): void
  {
    this.latitud = this.ciudad.latitud;
    this.longitud = this.ciudad.longitud;
  }

  mapClicked($event: any) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;

    this.locationService.getLocationInfo(this.marker.lat, this.marker.lng).subscribe(res=>{
      console.log(res)
      this.direccion.emit({
        numero: this.getLocation(res, 'street_number'),
        calle: this.getLocation(res, 'route'),
        ciudad: this.getLocation(res, 'locality'), 
      });
    });
  }

  private getAddressComponents(mapResponse: any, arrayIndex: number): Array<any>
  {
    let addressComponents = mapResponse['results'][arrayIndex]['address_components'];
    return addressComponents as Array<any>
  }

  private findComponentTypes(addressComponents:Array<any>, componentType: string) : any
  {
    let component = addressComponents.find(component => (component['types'] as Array<any>)
                                      .some(type => type == componentType));
    return component;
  }

  private getLocation(mapResponse: any ,locationType: string): string
  {
    //Definir este indice es necesario para dar una direccion simple concreta 
    //Pero que disponga de numeración. Queda pendiente buscar una solución más limpia.
    let index = locationType == "locality"? 2: 0
    let addresComponents = this.getAddressComponents(mapResponse, index); 
    let location = this.findComponentTypes(addresComponents, locationType);

    return location === undefined? "n/a" : location['long_name']
  }

}