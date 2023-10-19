import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comunas } from 'src/app/interfaces/user/comunas';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComunasService {

  ruta = (environment.api)+'getComunas';
  rutaSetComuna = (environment.api)+'setComuna';
  rutaUpdate = (environment.api)+'updateComuna';

  constructor(private http: HttpClient) { }

  getComunas() : Observable<Comunas>{
    return this.http.get<Comunas>(this.ruta); 
  }

  setComuna(comuna: any) {
    return this.http.post(this.rutaSetComuna, comuna);
  }

  updateComuna(comuna: any) {
    return this.http.post(this.rutaUpdate, comuna);
  }
}
