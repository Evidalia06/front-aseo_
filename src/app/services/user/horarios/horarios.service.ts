import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from 'src/app/interfaces/user/horario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  ruta = (environment.api)+'getHorarios';
  rutaSetHorario = (environment.api)+'setHorario';
  rutaUpdateHorario = (environment.api)+'updateHorario';

  constructor(private http: HttpClient) { }

  getHorarios() : Observable<Horario>{
    return this.http.get<Horario>(this.ruta); 
  }

  setHorario(horario: any) {
    return this.http.post(this.rutaSetHorario, horario);
  }

  updateHorario(horario: any) {
    return this.http.post(this.rutaUpdateHorario, horario);
  }
}
