import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() accion: string = '';
  mensaje: string = '';

  @ViewChild('error')
  error!: ModalDirective;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.accion == 'duplicate'){
      this.mensaje = "El dato ya se encuentra registrado, intentalo de nuevo.";
      this.error.show();
    }else if (this.accion == 'error'){
      this.mensaje = "No se pudo realizar el registro, intentalo de nuevo.";
      this.error.show();
    }else if (this.accion == 'faltaRuta'){
      this.mensaje = "Falta seleccionar una coordenada para guardar la ruta.";
      this.error.show();
    }else if (this.accion == 'faltanRutas'){
      this.mensaje = "Debe ingresar dos coordenadas para guardar una ruta.";
      this.error.show();
    }else if (this.accion == 'login'){
      this.mensaje = "Usuario o contraseña incorrectos, por favor intentelo de nuevo.";
      this.error.show();
    }
    this.accion = 'a';
  }

}
