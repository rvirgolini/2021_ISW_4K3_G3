import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { firebaseConfig } from '../environments/environment';

import { AppComponent } from './app.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { PagoComponent } from './component/pago/pago.component';
import { ResumenComponent } from './component/resumen/resumen.component';
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
