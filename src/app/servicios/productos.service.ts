import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para tipar los datos
export interface Productos {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://192.168.100.73:8080/devoluciones/api/productos'; // Cambia por la URL base de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }

  // Obtener un producto por ID
  getProductoById(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProducto(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(this.apiUrl, producto);
  }

  // Actualizar un producto existente
  updateProducto(id: number, producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(`${this.apiUrl}/${id}`, producto);
  }

  // Eliminar un producto por ID
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
