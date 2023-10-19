import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { UsuariosService } from 'src/app/services/user/usuarios/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  @Input() id_usuario: number = 0;
  formulario: FormGroup;
  usuarioConsultado: any = null;
  usuarios: any = [];
  accionExito: string = '';
  accion: string = ''

  @ViewChild('updateUsuario')
  updateUsuario!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _usuariosService : UsuariosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.consultarUsuario();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    })
  }

  consultarUsuario() {
    this._usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.usuarioConsultado = this.usuarios.find((element: { id_usuario: number; }) => element.id_usuario == this.id_usuario);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        cedula: [this.usuarioConsultado?.cedula, [Validators.required]],
        nombre: [this.usuarioConsultado?.nombre, [Validators.required]],
        apellido: [this.usuarioConsultado?.apellido, [Validators.required]],
        usuario: [this.usuarioConsultado?.usuario, [Validators.required]],
        clave: [this.usuarioConsultado?.clave, [Validators.required]],
      });
      if (this.usuarioConsultado) {
        this.updateUsuario.show();
      }
    });
  }

  update() {
    this.usuarios = {
      id_usuario: this.usuarioConsultado?.id_usuario,
      cedula: this.formulario.value.cedula,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      usuario: this.formulario.value.usuario,
      clave: this.formulario.value.clave,
    };

    this._usuariosService.updateUsuario(this.usuarios).subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
      if (this.usuarios === 1) {
        this.accionExito = 'update';
        this.updateUsuario.hide();

      } else {
        this.updateUsuario.hide();
        this.accion = 'error';
      }
    })

  }


}
