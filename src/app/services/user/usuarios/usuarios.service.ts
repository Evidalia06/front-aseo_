import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/user/usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  ruta = (environment.api)+'getUsuarios';
  rutaSetUsuario = (environment.api)+'setUsuario';
  rutaUpdateUsuario = (environment.api)+'updateUsuario';
  rutaLogin = (environment.api)+'login';

  constructor(private http: HttpClient) { }

  getUsuarios() : Observable<Usuario>{
    return this.http.get<Usuario>(this.ruta); 
  }

  setUsuario(usuario: any) {
    return this.http.post(this.rutaSetUsuario, usuario);
  }

  updateUsuario(usuario: any) {
    return this.http.post(this.rutaUpdateUsuario, usuario);
  }

  login(usuario: any) {
    return this.http.post(this.rutaLogin, usuario);
  }
}
