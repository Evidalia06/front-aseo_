import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from 'src/app/interfaces/user/carro';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  ruta = (environment.api)+'getCarros';
  rutaSetHorario = (environment.api)+'setCarro';
  rutaUpdate = (environment.api)+'updateCarro';

  constructor(private http: HttpClient) { }

  getCarros() : Observable<Carro>{
    return this.http.get<Carro>(this.ruta); 
  }

  setCarro(carro: any) {
    return this.http.post(this.rutaSetHorario, carro);
  }

  updateCarro(carro: any) {
    return this.http.post(this.rutaUpdate, carro);
  }
}
