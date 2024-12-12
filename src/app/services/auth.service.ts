// auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost/LogIn/forgot-password.php';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // Marcar como autenticado (cuando se logee)
  login(): void {
    this.isAuthenticated = true;
  }

  // Desconectar al usuario
  logout(): void {
    this.isAuthenticated = false;
  }

  // Verificar si está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
