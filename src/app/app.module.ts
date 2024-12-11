import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SingInComponent } from '../app/components/sing-in/sing-in.component';  // Componente de Registro
import { LoginComponent } from '../app/components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    LoginComponent,
    NavbarComponent  // Declarar el componente de registro
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
