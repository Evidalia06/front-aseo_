import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/interfaces/user/empresa';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';
import { UsuariosService } from 'src/app/services/user/usuarios/usuarios.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  user : any = {};
  empresas : Empresa|null = null;
  accionError : string = '';

  formulario : FormGroup;

  constructor(private ruta : Router, 
    private formBuilder : FormBuilder, private _empresaService : EmpresaService, private _usuariosService : UsuariosService) {
      this.formulario = new FormGroup({});
      this.crearFormulario();
     }

  ngOnInit(): void {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      usuario : ['',[Validators.required]],
      clave : ['',[Validators.required]]
    })
  }

  loginAdmin() {
    this.user = {
      usuario: this.formulario.value.usuario,
      clave: this.formulario.value.clave
    };
    console.log(this.user);

    this._usuariosService.login(this.user).subscribe(data => {
      this.user = data;
      if(Object.keys(this.user).length > 0){
        this.ruta.navigate(['admin/inicio/inicio-admin']);
      }else{
        this.accionError = 'login';
      }
    })

  }

}
