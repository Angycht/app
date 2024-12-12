import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  responseMessage: string = '';
  success: boolean = false;
  isPasswordVisible: boolean = false; // Para confirmar la visibilidad

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.passwordsMatchValidator // Validador para asegurar que las contraseñas coinciden
      }
    );
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Validador personalizado para verificar que las contraseñas coinciden
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword ? { passwordsMismatch: true } : null;
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;

      // Enviar los datos al servidor para actualizar la contraseña
      this.http.post('http://localhost/LogIn/change-password.php', formData, {
        withCredentials: true // Esto asegura que se envíen las cookies de sesión
      }).subscribe(
        (response: any) => {
          this.responseMessage = response.message;
          this.success = response.status === 'success';
        },
        (error) => {
          this.responseMessage = 'Error al cambiar la contraseña.';
          this.success = false;
        }
      );
    }
  }
}
