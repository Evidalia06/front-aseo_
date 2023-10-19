import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  [x: string]: any;

  @Input() id_empresa: number = 0;
  formulario: FormGroup;
  empresa: any = [];
  accionExito: string = '';
  accion: string = ''
  public archivos: any = [];
  logo : string = '';
  validar = true;

  @ViewChild('updateEmpresa')
  updateEmpresa!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _empresaService: EmpresaService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.id_empresa > 0) {
      this.consultarEmpresa();
    }
    this.validar = true;
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre_empresa: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      contacto: ['', [Validators.required]],
      mision: ['', [Validators.required]],
      vision: ['', [Validators.required]],
      valores: ['', [Validators.required]],
      copyright: ['', [Validators.required]]
    })
  }

  consultarEmpresa() {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresa = data;
      console.log(this.empresa);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        nombre_empresa: [this.empresa?.nombre_empresa, [Validators.required]],
        direccion: [this.empresa?.direccion, [Validators.required]],
        contacto: [this.empresa?.contacto, [Validators.required]],
        mision: [this.empresa?.mision, [Validators.required]],
        vision: [this.empresa?.vision, [Validators.required]],
        valores: [this.empresa?.valores, [Validators.required]],
        copyright: [this.empresa?.copyright, [Validators.required]],
      });
      this.logo = this.empresa?.logo;

      if (this.empresa) {
        this.updateEmpresa.show();
      }
    });
  }

  imagen = '';
  capturarImagen(event: any) {
    this.imagen = event.target.files[0];
    this.archivos.push(this.imagen);
    console.log(this.imagen);
  }

  update() {

    let empresa = new FormData();
    if(!(this.imagen == '')) {
      empresa.append('file', this.imagen);
    }
    empresa.append('id', this.empresa?.id);
    empresa.append('nombre_empresa', this.formulario.value.nombre_empresa);
    empresa.append('direccion', this.formulario.value.direccion);
    empresa.append('contacto', this.formulario.value.contacto);
    empresa.append('mision', this.formulario.value.mision);
    empresa.append('vision', this.formulario.value.vision);
    empresa.append('valores', this.formulario.value.valores);
    empresa.append('copyright', this.formulario.value.copyright);

    this._empresaService.updateEmpresa(empresa).subscribe(data => {
      this.empresa = data;
      if (Object.keys(this.empresa).length > 0) {
        this.accionExito = 'empresa';
        this.updateEmpresa.hide();

      } else {
        this.updateEmpresa.hide();
        this.accion = 'error';
      }

    })

  }

  editarImagen(){
    this.validar = false;
  }

}
