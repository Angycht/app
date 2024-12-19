import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/devoluciones/api/usuarios';  // Aquí la URL de tu backend

  constructor(private http: HttpClient) { }

  // Crear un nuevo usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
    ;
  }

