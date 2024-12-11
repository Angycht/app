import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  registroForm: FormGroup;
  responseMessage: string = '';
  success: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repetir: ['', [Validators.required]]
    });
  }

  // Método de envío del formulario
  onSubmit() {
    if (this.registroForm.invalid) {
      this.responseMessage = 'Por favor, completa todos los campos correctamente.';
      this.success = false;
      return;
    }

    const formData = this.registroForm.value;

    this.http.post('http://localhost/LogIn/registro.php', formData).pipe(
      catchError((error) => {
        // Si hay un error, mostrar el mensaje de error específico
        let errorMessage = 'Error al conectar con el servidor.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message; // Obtener el mensaje de error enviado desde el servidor
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor. Verifique la conexión.';
        } else {
          errorMessage = `Error desconocido: ${error.statusText}`;
        }
        this.responseMessage = errorMessage;
        this.success = false;
        return throwError(error);
      })
    ).subscribe(
      (response: any) => {
        this.responseMessage = response.message;
        this.success = response.status === 'success';
      }
    );
  }
}
