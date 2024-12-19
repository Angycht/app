// devoluciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevolucionesService {
  private baseUrl = 'http://localhost:8080/devoluciones/api/devoluciones'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener devoluciones por usuario
  getDevolucionesPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }
  getDevolucionesPorCorreo(correo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?correo=${correo}`);
  }
}

