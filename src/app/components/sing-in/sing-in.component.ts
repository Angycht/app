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
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.maxLength(255)]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const usuarioData = this.registroForm.value;
      this.http
        .post('http://localhost:8080/devoluciones/api/usuarios', usuarioData) // Cambia la URL según tu API
        .subscribe({
          next: (response) => {
            console.log('Usuario creado:', response);
            alert('Usuario creado con éxito');
          },
          error: (err) => {
            console.error('Error al crear el usuario:', err);
            alert('Error al crear el usuario');
          },
        });
    } else {
      alert('Formulario inválido. Revisa los campos.');
    }
  }
}