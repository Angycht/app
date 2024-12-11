import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage: string = '';
  success: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
