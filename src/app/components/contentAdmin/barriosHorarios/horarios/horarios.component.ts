import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { HorariosService } from 'src/app/services/user/horarios/horarios.service';



@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  id_horario : number = 0;
  horarios: any = [];
  horario : any = [];
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

  @ViewChild('insertHorario', { static: true })
  insertHorario!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  @ViewChild('error')
  error!: ModalDirective;

  constructor(private _horariosService: HorariosService, private formBuilder : FormBuilder) { 
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
    this._horariosService.getHorarios().subscribe(data => {
      this.horarios = data;
      console.log(this.horarios);
      this.mdbTable.setDataSource(this.horarios);
      this.previous = this.mdbTable.getDataSource();
    })

  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      dia : ['',[Validators.required]],
      hora_inicio : ['',[Validators.required]],
      hora_fin : ['',[Validators.required]]
    })
  }

  //buscar en la tabla
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.horarios = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.horarios = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){

    this.horario = {
      dia: this.formulario.value.dia,
      hora_inicio: this.formulario.value.hora_inicio,
      hora_fin: this.formulario.value.hora_fin
    };
    console.log(this.horario);

    this._horariosService.setHorario(this.horario).subscribe(data => {
      this.horario = data;
      console.log(this.horario);


      if (this.horario === 23000) {
        this.insertHorario.hide();
        this.accionError = 'duplicate';
      } else if (Object.keys(this.horario).length > 0) {
        this.insertHorario.hide();
        this.accionExito = 'insert';
      } else {
        this.insertHorario.hide();
        this.accionError = 'error';
      }
    })
  }

  editar(id:number){
    console.log(id);
    this.id_horario = id;
  }

}
