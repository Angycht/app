import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  usuario = {
    nombre: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    correo: '',
    contrasenia: ''
  };

  constructor(private usuarioService: UsuarioService) { }

  onSubmit() {
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario creado', response);
        alert('Usuario creado exitosamente');
      },
      (error) => {
        console.error('Error al crear usuario', error);
        alert('Error al crear usuario');
      }
    );
  }
}
