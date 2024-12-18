import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password', // Nombre del componente en el HTML
  templateUrl: './change-password.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./change-password.component.css'] // Ruta al archivo CSS del componente
})
export class ChangePasswordComponent {
  // Define un FormGroup que representa el formulario de cambio de contraseña
  changePasswordForm: FormGroup;

  // Variables para manejar los mensajes de respuesta y el estado de éxito/error
  responseMessage: string = '';
  success: boolean = false;

  // Variables para manejar la visibilidad de las contraseñas y el estado de carga
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;  // Estado que indica si la petición al servidor está en proceso

  // Constructor del componente, que inicializa el formulario y el HttpClient
  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Inicializa el formulario con los controles necesarios y sus validaciones
    this.changePasswordForm = this.fb.group(
      {
        // Control para el correo del usuario, validado como obligatorio y con formato de correo electrónico
        email: ['', [Validators.required, Validators.email]],

        // Control para la contraseña actual, validado como obligatorio
        oldPassword: ['', [Validators.required]],

        // Control para la nueva contraseña, validada con una expresión regular de seguridad
        newPassword: ['', [
          Validators.required,
          // Validación para la nueva contraseña (debe contener al menos una mayúscula, una minúscula, un número y un símbolo especial)
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]],

        // Control para confirmar la nueva contraseña, validado como obligatorio
        confirmPassword: ['', [Validators.required]]
      },
      {
        // Validador personalizado para asegurarse de que las contraseñas coinciden
        validators: this.passwordsMatchValidator
      }
    );
  }

  // Método para alternar la visibilidad de las contraseñas (mostrar/ocultar)
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Validador personalizado que verifica que las contraseñas coincidan
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;  // Obtiene el valor de la nueva contraseña
    const confirmPassword = group.get('confirmPassword')?.value;  // Obtiene el valor de la confirmación de la nueva contraseña
    // Si las contraseñas no coinciden, devuelve un error
    return newPassword && confirmPassword && newPassword !== confirmPassword ? { passwordsMismatch: true } : null;
  }

  // Método que se ejecuta cuando el usuario envía el formulario
  onSubmit(): void {
    if (this.changePasswordForm.valid) {  // Verifica si el formulario es válido
      console.log('Formulario enviado:', this.changePasswordForm.value);  // Muestra los datos del formulario en la consola
      this.isLoading = true;  // Indica que la solicitud está en proceso
      const formData = this.changePasswordForm.value;  // Obtiene los datos del formulario
      
      // Realiza una solicitud POST al servidor con los datos del formulario
      this.http.post('http://localhost/LogIn/change-password.php', formData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (response: any) => {
          this.isLoading = false;  // Detiene el indicador de carga
          console.log('Respuesta del servidor:', response);  // Muestra la respuesta del servidor en la consola
          this.responseMessage = response.message;  // Muestra el mensaje de respuesta del servidor
          this.success = response.status === 'success';  // Marca si la respuesta fue exitosa
        },
        (error) => {
          this.isLoading = false;  // Detiene el indicador de carga en caso de error
          console.log('Error:', error);  // Muestra el error en la consola
          this.responseMessage = 'Error al cambiar la contraseña';  // Mensaje de error
          this.success = false;  // Indica que la solicitud falló
        }
      );
    } else {
      console.log('Formulario no válido', this.changePasswordForm.errors);  // Muestra los errores de validación del formulario
    }
  }
}
