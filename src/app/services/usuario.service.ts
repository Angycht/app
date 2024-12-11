
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url= 'http://localhost/app/src/app/php/registro';

  constructor(private http:HttpClient) { }

  registrar(){
    return this.http.get(`${this.url}registro.php`);
  }
}
