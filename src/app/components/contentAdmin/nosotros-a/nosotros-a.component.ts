import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { Empresa } from 'src/app/interfaces/user/empresa';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';

@Component({
  selector: 'app-nosotros-a',
  templateUrl: './nosotros-a.component.html',
  styleUrls: ['./nosotros-a.component.scss']
})
export class NosotrosAComponent implements OnInit {

  id_empresa : number = 0;
  empresas : Empresa|null = null;
  constructor(private _empresaService : EmpresaService) { }

  @ViewChild('updateEmpresa')
  updateEmpresa!: ModalDirective;
  
  ngOnInit(): void {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    })
  }

  editar(){
    this.id_empresa += 1;
  }

}
