import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDevolucionesComponent } from './components/lista-devoluciones/lista-devoluciones.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
const routes: Routes = [
  {path:'singIn',component:UsuarioComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'devoluciones',component:ListaDevolucionesComponent},
  {path:'config',component:ConfiguracionComponent},
  {path:'home',component:HomeComponent},
  {path:'logIn',component:LoginComponent},
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/usuario', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
