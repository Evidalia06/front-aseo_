import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CarrosService } from 'src/app/services/user/carros/carros.service';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.scss']
})
export class CarrosComponent implements OnInit {

  id_carro : number = 0;
  carros : any = [];
  carro : any = [];
  accionExito : string = '';
  accionError : string = '';
  formulario : FormGroup;

  searchText: string = '';
  previous: string = '';

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @ViewChild('insertCarro', { static: true })
  insertCarro!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  @ViewChild('error')
  error!: ModalDirective;

  constructor(private _carrosService: CarrosService, private formBuilder : FormBuilder) { 
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
    this._carrosService.getCarros().subscribe(data => {
      this.carros = data;
      console.log(this.carros);
      this.mdbTable.setDataSource(this.carros);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      marca : ['',[Validators.required]],
      modelo : ['',[Validators.required]],
      placa : ['',[Validators.required]],
      ciudad_placa : ['',[Validators.required]]
    })
  }

  //Buscar en la tabla
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.carros = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.carros = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){
    this.carro = {
      marca: this.formulario.value.marca,
      modelo: this.formulario.value.modelo,
      placa: this.formulario.value.placa,
      ciudad_placa: this.formulario.value.ciudad_placa
    };
    console.log(this.carro);

    this._carrosService.setCarro(this.carro).subscribe(data => {
      this.carro = data;
      console.log(this.carro);


      if (this.carro === 23000) {
        this.insertCarro.hide();
        this.accionError = 'duplicate';
      } else if (Object.keys(this.carro).length > 0) {
        this.insertCarro.hide();
        this.accionExito = 'insert';
      } else {
        this.insertCarro.hide();
        this.accionError = 'error';
      }
    })
  }

  editar(id:number){
    console.log(id);
    this.id_carro = id;
  }


}
