import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from 'src/app/interfaces/user/conductor';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConductorsService {

  ruta = (environment.api)+'getConductores';
  rutaSetConductor = (environment.api)+'setConductor';
  rutaUpdate = (environment.api)+'updateConductor';

  constructor(private http: HttpClient) { }

  getConductores() : Observable<Conductor>{
    return this.http.get<Conductor>(this.ruta); 
  }

  setConductor(conductor: any) {
    return this.http.post(this.rutaSetConductor, conductor);
  }

  updateConductor(conductor: any) {
    return this.http.post(this.rutaUpdate, conductor);
  }
}
