import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/user/empresa';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  empresas : Empresa|null = null;
  constructor(private _empresaService : EmpresaService) { }

  ngOnInit(): void {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })
  }

}
