import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ConductorsService } from 'src/app/services/user/conductors/conductors.service';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conductors',
  templateUrl: './conductors.component.html',
  styleUrls: ['./conductors.component.scss']
})
export class ConductorsComponent implements OnInit {

  id_conductor : number = 0;
  conductores : any = [];
  conductor : any = [];
  accionExito : string = "";
  accionError : string = "";

  searchText: string = '';
  previous: string = '';
  formulario : FormGroup;

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @ViewChild('insertConductor', { static: true })
  insertConductor!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  @ViewChild('error')
  error!: ModalDirective;

  constructor(private _conductorsService : ConductorsService, private formBuilder : FormBuilder) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }

  ngOnInit(): void {
    this._conductorsService.getConductores().subscribe(data => {
      this.conductores = data;
      console.log(this.conductores);
      this.mdbTable.setDataSource(this.conductores);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      cedula : ['',[Validators.required]],
      nombre : ['',[Validators.required]],
      licencia : ['',[Validators.required]],
      tipo_licencia : ['',[Validators.required]],
      telefono : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
    })
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.conductores = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.conductores = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){
    this.conductor = {
      cedula: this.formulario.value.cedula,
      nombre: this.formulario.value.nombre,
      licencia: this.formulario.value.licencia,
      tipo_licencia: this.formulario.value.tipo_licencia,
      telefono: this.formulario.value.telefono,
      direccion: this.formulario.value.direccion,
    };
    console.log(this.conductor);

    this._conductorsService.setConductor(this.conductor).subscribe(data => {
      this.conductor = data;
      console.log(this.conductor);


      if (this.conductor === 23000) {
        this.insertConductor.hide();
        this.accionError = 'duplicate';
      } else if (Object.keys(this.conductor).length > 0) {
        this.insertConductor.hide();
        this.accionExito = 'insert';
      } else {
        this.insertConductor.hide();
        this.accionError = 'error';
      }
    })
  }

  editar(id:number){
    this.id_conductor = id;
  }

}
