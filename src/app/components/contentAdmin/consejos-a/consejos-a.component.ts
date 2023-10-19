import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ConsejosService } from 'src/app/services/user/consejos/consejos.service';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Consejo } from 'src/app/interfaces/user/consejos';


@Component({
  selector: 'app-consejos-a',
  templateUrl: './consejos-a.component.html',
  styleUrls: ['./consejos-a.component.scss']
})
export class ConsejosAComponent implements OnInit {

  public archivos : any = [];

  id_consejo : number = 0;
  consejos : Consejo[] = [];
  consejo : any = [];
  accion : string = '';
  formulario : FormGroup;
  accionExito : string = '';
  accionError : string = '';

  searchText: string = '';
  previous: string = '';
  mdbValidate1 : boolean = true;

  mdbModal = new MDBModalRef;

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @ViewChild('insertConsejo', { static: true })
  insertConsejo!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  constructor(private _consejosService : ConsejosService, private formBuilder : FormBuilder, private sanitizer: DomSanitizer) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }


  ngOnInit(): void {
    this._consejosService.getConsejos().subscribe(data => {
      this.consejos = data;
      console.log(this.consejos);
      this.mdbTable.setDataSource(this.consejos);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre_consejo : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      img : ['',[Validators.required]]
    })
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.consejos = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.consejos = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  } 

  insertar(){

    let consejo = new FormData();
    consejo.append('file',this.imagen);
    consejo.append('nombre_consejo', this.formulario.value.nombre_consejo);
    consejo.append('descripcion', this.formulario.value.descripcion);

    this._consejosService.setConsejos(consejo).subscribe(data => {
      this.consejo = data;
      console.log(this.consejo);


      if (this.consejo === 23000) {
        this.insertConsejo.hide();
        this.accionError = 'duplicate';
      } else if (Object.keys(this.consejo).length > 0) {
        this.insertConsejo.hide();
        this.accionExito = 'insert';
      } else {
        this.insertConsejo.hide();
        this.accionError = 'error';
      }
    })
  }

  editar(id:number){
    this.id_consejo = id;
  }

  imagen = '';
  capturarImagen(event: any){
    this.imagen = event.target.files[0];
    this.archivos.push(this.imagen);
    console.log(this.imagen);
  }

  ensayo(){
    let ensayo = new FormData();
    ensayo.append('file',this.imagen);
    
    console.log(ensayo);
    this._consejosService.addImage(ensayo).subscribe(data => {
      this.consejo = data;
      console.log(this.consejo);
    })
  }


}
