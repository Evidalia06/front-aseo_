import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { BarriosService } from 'src/app/services/user/barrios/barrios.service';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunasService } from 'src/app/services/user/comunas/comunas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
  styleUrls: ['./barrios.component.scss']
})
export class BarriosComponent implements OnInit {

  id_barrio : number = 0;
  barrios : any = [];
  barrio : any = [];
  comunas : any = [];
  accion : string = '';
  accionExito = '';
  formulario : FormGroup;

  searchText: string = '';
  previous: string = '';

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @ViewChild('insertBarrio', { static: true })
  insertBarrio!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  @ViewChild('error')
  error!: ModalDirective;

  constructor(private _barriosService: BarriosService, private _comunasService: ComunasService,private formBuilder : FormBuilder, 
    private ruta: Router) { 
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
    this._barriosService.getBarrios().subscribe(data => {
      this.barrios = data;
      this.mdbTable.setDataSource(this.barrios);
      this.previous = this.mdbTable.getDataSource();
    })
    this._comunasService.getComunas().subscribe(data => {
      this.comunas = data;
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre_comuna : ['',[Validators.required]],
      barrio : ['',[Validators.required]],
    })
  }
  //buscar en la tabla
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.barrios = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.barrios = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){
    this.barrio = {
      nombre_comuna: this.formulario.value.nombre_comuna,
      barrio: this.formulario.value.barrio
    };

    this._barriosService.setBarrio(this.barrio).subscribe(data => {
      this.barrio = data;
      console.log(this.barrio);


      if (this.barrio === 23000) {
        this.insertBarrio.hide();
        this.accion = 'duplicate';
      } else if (Object.keys(this.barrio).length > 0) {
        this.insertBarrio.hide();
        this.accionExito = 'insert';
      } else {
        this.insertBarrio.hide();
        this.accion = 'error';
      }
    })
  }

  editar(id:number){
    this.id_barrio = id;
  }

  redirectTo(uri: string) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.ruta.navigate([uri]));
  }

}
