import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from 'src/app/interfaces/user/rutas';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  ruta = (environment.api)+'getRutas';
  rutaSetRutas = (environment.api)+'setRutas';
  rutaUpdateRutas = (environment.api)+'updateRuta';

  constructor(private http: HttpClient) { }

  getRutas() : Observable<any>{
    return this.http.get<any>(this.ruta); 
  }

  setRutas(ruta: Rutas) {
    return this.http.post(this.rutaSetRutas, ruta);
  }

  updateRuta(ruta: any) {
    return this.http.post(this.rutaUpdateRutas, ruta);
  }
}
