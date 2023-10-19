import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/interfaces/user/empresa';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {


  ruta = (environment.api)+'getInfEmpresa';
  rutaUpdate = (environment.api)+'updateEmpresa';

  constructor(private http:HttpClient) { }

  getInfEmpresa() : Observable<Empresa>{
    return this.http.get<Empresa>(this.ruta);
    
  }

  updateEmpresa(empresa: any) {
    return this.http.post(this.rutaUpdate, empresa);
  }
}
