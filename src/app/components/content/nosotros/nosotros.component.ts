import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  empresas : any = [];
  constructor(private _empresaService : EmpresaService) {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })
   }

  ngOnInit(): void {
  }

}
