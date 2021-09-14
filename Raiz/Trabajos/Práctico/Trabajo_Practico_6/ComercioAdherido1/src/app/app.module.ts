import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { PagoComponent } from './component/pago/pago.component';
import { ResumenComponent } from './component/resumen/resumen.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './component/map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    PagoComponent,
    ResumenComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJn4F2XB6c_-DAX5m9nmfjDTsT-v5UppY'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
