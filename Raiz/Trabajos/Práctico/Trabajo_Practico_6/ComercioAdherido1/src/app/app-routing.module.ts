import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './component/formulario/formulario.component';
import { PagoComponent } from './component/pago/pago.component';

const routes: Routes = [
  { path:'formulario', component: FormularioComponent },
  { path:'pago/:value', component: PagoComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
