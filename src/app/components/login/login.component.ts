import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage: string = '';
  success: boolean = false;
  isPasswordVisible: boolean = false;  // Inicializa la variable para controlar la visibilidad de la contraseña

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Crear el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;

    // Realizar la solicitud POST al backend PHP
    this.http.post('http://localhost/LogIn/login.php', formData, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error.message) {
          this.responseMessage = error.error.message;
          this.success = false;
        } else {
          this.responseMessage = 'Error al conectar con el servidor.';
          this.success = false;
        }
        return throwError(error);
      })
    ).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.responseMessage = response.message;
          this.success = true;
          this.authService.login(); // Marca como autenticado
          this.router.navigate(['/dashboard']); // Redirige al dashboard
        } else {
          this.responseMessage = response.message;
          this.success = false;
        }
      },
      (error) => {
        // Si se da un error en la suscripción
        this.responseMessage = 'Error al conectar con el servidor.';
        this.success = false;
      }
    );
  }
}
