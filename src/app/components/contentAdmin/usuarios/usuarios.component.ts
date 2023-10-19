import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { UsuariosService } from 'src/app/services/user/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  id_usuario : number = 0;
  usuarios : any = [];
  usuario : any = [];
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

  @ViewChild('insertUsuario', { static: true })
  insertUsuario!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  @ViewChild('error')
  error!: ModalDirective;

  constructor(private _usuariosService: UsuariosService, private formBuilder : FormBuilder) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }

  ngOnInit(): void {
    this._usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
      this.mdbTable.setDataSource(this.usuarios);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    })
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.usuarios = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.usuarios = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){
    this.usuario = {
      cedula: this.formulario.value.cedula,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      usuario: this.formulario.value.usuario,
      clave: this.formulario.value.clave,
    };
    console.log(this.usuario);

    this._usuariosService.setUsuario(this.usuario).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario);


      if (this.usuario === 23000) {
        this.insertUsuario.hide();
        this.accionError = 'duplicate';
      } else if (Object.keys(this.usuario).length > 0) {
        this.insertUsuario.hide();
        this.accionExito = 'insert';
      } else {
        this.insertUsuario.hide();
        this.accionError = 'error';
      }
    })
  }

  editar(id:number){
    this.id_usuario = id;
  }
}
