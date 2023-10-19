import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { ConductorsService } from 'src/app/services/user/conductors/conductors.service';
import { RutasService } from 'src/app/services/user/rutas/rutas.service';

@Component({
  selector: 'app-rutas-list',
  templateUrl: './rutas-list.component.html',
  styleUrls: ['./rutas-list.component.scss']
})
export class RutasListComponent implements OnInit {

  abrir = 0;
  id_ruta : number = 0;
  rutas : any = [];
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

  constructor(private _conductorsService : ConductorsService, private formBuilder : FormBuilder, private _rutaservice : RutasService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }

  ngOnInit(): void {

    this._rutaservice.getRutas().subscribe(data => {
      this.rutas = data;
      console.log(this.rutas);
      this.mdbTable.setDataSource(this.rutas);
      this.previous = this.mdbTable.getDataSource();
    });
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
      this.rutas = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.rutas = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }


  editar(id:number){
    this.id_ruta = id;
  }
  abrirModal(){
    this.abrir = this.abrir + 1;
    console.log(this.abrir);
  }

}
