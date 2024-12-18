import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que este servicio esté configurado correctamente

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  isLoading: boolean = false; // Variable para controlar la carga

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico con validaciones
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.isLoading = true; // Activar el estado de carga

      this.authService.forgotPassword(email).subscribe(
        (response: any) => {
          console.log('Respuesta recibida:', response);  // Ver el contenido crudo de la respuesta
          this.successMessage = response.message;
          this.errorMessage = undefined;
          this.isLoading = false; // Desactivar el estado de carga

          // Redirigir a otra página (si es necesario)
          // this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          this.successMessage = undefined;
          this.errorMessage = error?.error?.message || 'Hubo un problema al enviar el correo.';
          this.isLoading = false; // Desactivar el estado de carga
        }
      );
    }
  }

  // Método para verificar si un campo es inválido
  get email() {
    return this.forgotPasswordForm.get('email');
  }
}
