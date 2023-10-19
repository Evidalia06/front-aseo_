import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-exito',
  templateUrl: './modal-exito.component.html',
  styleUrls: ['./modal-exito.component.scss']
})
export class ModalExitoComponent implements OnInit {

  @Input() accionExito: string = '';
  mensaje: string = '';

  @ViewChild('exito')
  exito!: ModalDirective;

  constructor(private ruta: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.accionExito == 'insert') {
      this.mensaje = "El registro fue exitoso";
      this.exito.show();
    } else if (this.accionExito == 'update') {
      this.mensaje = "El registro fue actualizado";
      this.exito.show();
    } else if (this.accionExito == 'empresa') {
      this.mensaje = "La información fue actualizada";
      this.exito.show();
    }

  }

  cerrar() {
    if (this.ruta.url == '/admin/inicio/comunas') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/comunas']));
    }else if (this.ruta.url == '/admin/inicio/barrios') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/barrios']));
    } else if (this.ruta.url == '/admin/inicio/horarios') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/horarios']));
    } else if (this.ruta.url == '/admin/inicio/carros') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/carros']));
    } else if (this.ruta.url == '/admin/inicio/conductores') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/conductores']));
    } else if (this.ruta.url == '/admin/inicio/nosotros') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/nosotros']));
    } else if (this.ruta.url == '/admin/inicio/consejos') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/consejos']));
    } else if (this.ruta.url == '/admin/inicio/rutas') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/rutas']));
    } else if (this.ruta.url == '/admin/inicio/videos') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/videos']));
    } else if (this.ruta.url == '/admin/inicio/usuarios') {
      this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.ruta.navigate(['admin/inicio/usuarios']));
    }

  }

}
