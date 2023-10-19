import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consejo, ResponseConsejo } from 'src/app/interfaces/user/consejos';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsejosService {

  ruta = (environment.api)+'getConsejos';
  rutaSetConsejo = (environment.api)+'setConsejos';
  rutaUpdate = (environment.api)+'updateConsejo'
  image = (environment.api)+'addImage'

  constructor(private http:HttpClient) { }

  getConsejos() : Observable<Consejo[]>{
    return this.http.get<ResponseConsejo>(this.ruta).pipe(map(response => response.data));
  }

  setConsejos(consejos: any) {
    return this.http.post(this.rutaSetConsejo, consejos);
  }

  updateConsejo(consejo: any) {
    return this.http.post(this.rutaUpdate, consejo);
  }

  addImage(consejos: any) {
    return this.http.post(this.image, consejos);
  }

}
