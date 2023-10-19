import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { ConductorsService } from 'src/app/services/user/conductors/conductors.service';

@Component({
  selector: 'app-editar-conductor',
  templateUrl: './editar-conductor.component.html',
  styleUrls: ['./editar-conductor.component.scss']
})
export class EditarConductorComponent implements OnInit {

  @Input() id_conductor: number = 0;
  formulario: FormGroup;
  conductorConsultada: any = null;
  conductors: any = [];
  accionExito: string = '';
  accion: string = ''

  @ViewChild('updateConductor')
  updateConductor!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _conductorsService : ConductorsService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.consultarConductor();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      cedula : ['',[Validators.required]],
      nombre : ['',[Validators.required]],
      licencia : ['',[Validators.required]],
      tipo_licencia : ['',[Validators.required]],
      telefono : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
    })
  }

  consultarConductor() {
    this._conductorsService.getConductores().subscribe(data => {
      this.conductors = data;
      this.conductorConsultada = this.conductors.find((element: { id: number; }) => element.id == this.id_conductor);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        cedula: [this.conductorConsultada?.cedula, [Validators.required]],
        nombre: [this.conductorConsultada?.nombre, [Validators.required]],
        licencia: [this.conductorConsultada?.licencia, [Validators.required]],
        tipo_licencia: [this.conductorConsultada?.tipo_licencia, [Validators.required]],
        telefono: [this.conductorConsultada?.telefono, [Validators.required]],
        direccion: [this.conductorConsultada?.direccion, [Validators.required]],
      });
      if (this.conductorConsultada) {
        this.updateConductor.show();
      }
    });
  }

  update() {
    this.conductors = {
      id: this.conductorConsultada?.id,
      cedula: this.formulario.value.cedula,
      nombre: this.formulario.value.nombre,
      licencia: this.formulario.value.licencia,
      tipo_licencia: this.formulario.value.tipo_licencia,
      telefono: this.formulario.value.telefono,
      direccion: this.formulario.value.direccion,
    };

    this._conductorsService.updateConductor(this.conductors).subscribe(data => {
      this.conductors = data;
      if (this.conductors === 1) {
        this.accionExito = 'update';
        this.updateConductor.hide();

      } else {
        this.updateConductor.hide();
        this.accion = 'error';
      }
    })

  }

}
