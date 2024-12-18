import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces para tipado
export interface DevolucionesDTO {
  id: number;
  descripcion: string;
  fecha: string;
}

export interface ProductoDevolucionOutputDTO {
  productoId: number;
  devolucionId: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {
  private apiUrl = 'http://192.168.100.73:8080/devoluciones/api'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Listar todas las devoluciones
  getDevoluciones(): Observable<DevolucionesDTO[]> {
    return this.http.get<DevolucionesDTO[]>(`${this.apiUrl}/devoluciones`);
  }

  // Obtener devolución por ID
  getDevolucionById(id: number): Observable<DevolucionesDTO> {
    return this.http.get<DevolucionesDTO>(`${this.apiUrl}/devoluciones/${id}`);
  }

  // Crear una nueva devolución
  createDevolucion(devolucion: DevolucionesDTO): Observable<DevolucionesDTO> {
    return this.http.post<DevolucionesDTO>(`${this.apiUrl}/devoluciones`, devolucion);
  }

  // Actualizar una devolución
  updateDevolucion(id: number, devolucion: DevolucionesDTO): Observable<DevolucionesDTO> {
    return this.http.put<DevolucionesDTO>(`${this.apiUrl}/devoluciones/${id}`, devolucion);
  }

  // Eliminar una devolución
  deleteDevolucion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/devoluciones/${id}`);
  }

  // Listar productos relacionados con devoluciones
  getProductosDevolucion(idProducto: number): Observable<ProductoDevolucionOutputDTO[]> {
    return this.http.get<ProductoDevolucionOutputDTO[]>(`${this.apiUrl}/devoluciones/${idProducto}/devolucion`);
  }
}
