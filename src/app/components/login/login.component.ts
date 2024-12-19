// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { correo: '', contrasenia: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData.correo, this.loginData.contrasenia).subscribe(
      (response) => {
        alert('Login exitoso');
        this.router.navigate(['/dashboard']); // Redirige a otra página tras el login
      },
      (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }
}
