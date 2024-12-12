import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SingInComponent } from '../app/components/sing-in/sing-in.component';  // Componente de Registro
import { LoginComponent } from '../app/components/login/login.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { DevolucionesDetalleComponent } from './components/devoluciones-detalle/devoluciones-detalle.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ChangePasswordComponent } from '../app/components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    SingInComponent,
    LoginComponent,
    HomeComponent,
    DevolucionesComponent,
    DevolucionesDetalleComponent,
    ConfiguracionComponent,
    NavbarComponent,
    DashboardComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent, // Declarar el componente de registro
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
