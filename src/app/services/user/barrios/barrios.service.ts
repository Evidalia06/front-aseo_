import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barrio } from 'src/app/interfaces/user/barrio';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BarriosService {

  ruta = (environment.api)+'getBarrios';
  rutaSetBarrio = (environment.api)+'setBarrio';
  rutaUpdateBarrio = (environment.api)+'updateBarrio';

  constructor(private http: HttpClient) { }

  getBarrios() : Observable<Barrio[]>{
    return this.http.get<Barrio[]>(this.ruta); 
  }

  setBarrio(barrio: any) {
    return this.http.post(this.rutaSetBarrio, barrio);
  }

  updateBarrio(barrio: any) {
    return this.http.post(this.rutaUpdateBarrio, barrio);
  }

}
