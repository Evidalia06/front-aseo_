import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';


@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.scss']
})
export class InicioAdminComponent implements OnInit {

  empresas : any = [];
  constructor(private _empresaService : EmpresaService, private ruta : Router) { }

  ngOnInit(): void {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })
  }


  redirectTo(uri: string) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.ruta.navigate([uri]));
  }

}
