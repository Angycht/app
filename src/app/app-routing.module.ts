import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { DevolucionesDetalleComponent } from './components/devoluciones-detalle/devoluciones-detalle.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'singIn',component:SingInComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'devoluciones',component:DevolucionesComponent},
  {path:'devoluciones-detalle',component:DevolucionesDetalleComponent},
  {path:'config',component:ConfiguracionComponent},
  {path:'home',component:HomeComponent},
  {path:'logIn',component:LoginComponent},
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/singIn', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
