// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/devoluciones/api/auth'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  login(correo: string, contrasenia: string): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/login`, { correo, contrasenia });
  }
}
