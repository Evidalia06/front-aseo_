import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/user/empresa';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {

  empresas : Empresa|null = null;
  constructor(private _empresaService : EmpresaService) { }

  ngOnInit(): void {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })

  }

}
