import { Marker } from '../../models/marker';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Direccion } from '../../models/direccion';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
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
    this.lat = -31.413972040086794;
    this.lng = -64.18537430820507;
    this.zoom = 14;
  }

  mapClicked($event: any) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;

    this.locationService.getLocationInfo(this.marker.lat, this.marker.lng).subscribe(res=>{
      this.direccion.emit({
        numero: (res['results'][0]['address_components'] as Array<any>).find(comp => (comp['types'] as Array<any>).some(compType => compType === 'street_number'))['long_name'],
        calle: (res['results'][0]['address_components'] as Array<any>).find(comp => (comp['types'] as Array<any>).some(compType => compType === 'route'))['long_name'],
        ciudad: (res['results'][0]['address_components'] as Array<any>).find(comp => (comp['types'] as Array<any>).some(compType => compType === 'locality'))['long_name']
      });
    });
  }

}