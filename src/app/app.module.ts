import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Componente de Registro
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from './components/home/home.component';import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ListaDevolucionesComponent } from './components/lista-devoluciones/lista-devoluciones.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionComponent,
    DashboardComponent,
    LoginComponent,
    
    ListaDevolucionesComponent,
    HomeComponent,
    UsuarioComponent,
    NavbarComponent,
     // Declarar el componente de registro
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Asegurarse de que HttpClientModule esté importado
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule  // Usado para formularios reactivos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
