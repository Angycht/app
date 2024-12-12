import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Asegúrate de tener este servicio configurado
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  http: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }


  apiUrl(apiUrl: any, arg1: { email: string; }, arg2: { headers: { 'Content-Type': string; }; }): Observable<any> {
    throw new Error('Method not implemented.');
  }
  
  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      
      this.authService.forgotPassword(email).subscribe(
        (response) => {
          this.successMessage = 'Te hemos enviado un correo con la nueva contraseña.';
        },
        (error) => {
          this.errorMessage = 'Hubo un problema al enviar el correo. Intenta nuevamente.';
          console.error(error);
        }
      );
    }
  }
}
