import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/user/empresa/empresa.service';


@Component({
  selector: 'app-separacion',
  templateUrl: './separacion.component.html',
  styleUrls: ['./separacion.component.scss']
})
export class SeparacionComponent implements OnInit {

  empresa: any = [];

  constructor(private _empresaService : EmpresaService) { }

  ngOnInit(): void {
    this._empresaService.getInfEmpresa().subscribe(data => {
      this.empresa = data;
      console.log(this.empresa);
    })
  }

}
