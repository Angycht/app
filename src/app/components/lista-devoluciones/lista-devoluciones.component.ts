import { Component, OnInit } from '@angular/core';
import { DevolucionesService, DevolucionesDTO } from '../../servicios/devoluciones.service';
@Component({
  selector: 'app-lista-devoluciones',
  templateUrl: './lista-devoluciones.component.html',
  styleUrls: ['./lista-devoluciones.component.css']
})
export class ListaDevolucionesComponent implements OnInit {
  devoluciones: DevolucionesDTO[] = [];

  constructor(private devolucionesService: DevolucionesService) {}

  ngOnInit(): void {
    this.devolucionesService.getDevoluciones().subscribe(data => {
      this.devoluciones = data;
    });
  }
}
