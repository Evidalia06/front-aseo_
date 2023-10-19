import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayaoutAdminComponent } from './components/layaout-admin/layaout-admin.component';
import { InicioComponent } from './components/content/inicio/inicio.component';
import { LayaoutComponent } from './components/layaout/layaout.component';
import { NavComponent } from './components/nav/nav.component';
import { SeparacionComponent } from './components/content/separacion/separacion/separacion.component';
import { RutasComponent } from './components/content/rutas/rutas.component';
import { BarriohorarioComponent } from './components/content/barriohorario/barriohorario.component';
import { NosotrosComponent } from './components/content/nosotros/nosotros.component';
import { LoginAdminComponent } from './components/contentAdmin/login-admin/login-admin.component';
import { InicioAdminComponent } from './components/contentAdmin/inicio-admin/inicio-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavAdminComponent } from './components/contentAdmin/nav-admin/nav-admin.component';
import { Card1Component } from './components/content/cards/card1/card1.component';
import { Card2Component } from './components/content/cards/card2/card2.component';
import { Card3Component } from './components/content/cards/card3/card3.component';
import { Card4Component } from './components/content/cards/card4/card4.component';
import { Card5Component } from './components/content/cards/card5/card5.component';
import { Card6Component } from './components/content/cards/card6/card6.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarriosComponent } from './components/contentAdmin/barriosHorarios/barrios/barrios.component';
import { HorariosComponent } from './components/contentAdmin/barriosHorarios/horarios/horarios.component';
import { CarrosComponent } from './components/contentAdmin/allRutas/carros/carros.component';
import { ConductorsComponent } from './components/contentAdmin/allRutas/conductors/conductors.component';
import { RutasAComponent } from './components/contentAdmin/allRutas/rutas-a/rutas-a.component';
import { ConsejosAComponent } from './components/contentAdmin/consejos-a/consejos-a.component';
import { InicioAdmin1Component } from './components/contentAdmin/inicio-admin1/inicio-admin1.component';
import { NosotrosAComponent } from './components/contentAdmin/nosotros-a/nosotros-a.component';
import { ComunasComponent } from './components/contentAdmin/barriosHorarios/comunas/comunas.component';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { ModalExitoComponent } from './components/contentAdmin/modals/modal-exito/modal-exito.component';
import { ModalErrorComponent } from './components/contentAdmin/modals/modal-error/modal-error.component';
import { EditarComunaComponent } from './components/contentAdmin/modals/editar-comuna/editar-comuna.component';
import { EditarBarrioComponent } from './components/contentAdmin/modals/editar-barrio/editar-barrio.component';
import { EditarHorarioComponent } from './components/contentAdmin/modals/editar-horario/editar-horario.component';
import { EditarConductorComponent } from './components/contentAdmin/modals/editar-conductor/editar-conductor.component';
import { EditarCarroComponent } from './components/contentAdmin/modals/editar-carro/editar-carro.component';
import { EditarPerfilComponent } from './components/contentAdmin/modals/editar-perfil/editar-perfil.component';
import { EditarConsejoComponent } from './components/contentAdmin/modals/editar-consejo/editar-consejo.component';
import { UsuariosComponent } from './components/contentAdmin/usuarios/usuarios.component';
import { VideosComponent } from './components/contentAdmin/videos/videos.component';
import { EditarUsuarioComponent } from './components/contentAdmin/modals/editar-usuario/editar-usuario.component';
import { EditarVideosComponent } from './components/contentAdmin/modals/editar-videos/editar-videos.component';
import { SafePipe } from './safe.pipe';
import { RutasListComponent } from './components/contentAdmin/allRutas/rutas-list/rutas-list.component';
import { EditarRutasComponent } from './components/contentAdmin/modals/editar-rutas/editar-rutas.component';
//import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

//const config: SocketIoConfig = {url: 'http://localhost:8000', options: {}};

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    LayaoutAdminComponent,
    InicioComponent,
    LayaoutComponent,
    NavComponent,
    SeparacionComponent,
    RutasComponent,
    BarriohorarioComponent,
    NosotrosComponent,
    LoginAdminComponent,
    InicioAdminComponent,
    NavAdminComponent,
    Card1Component,
    Card2Component,
    Card3Component,
    Card4Component,
    Card5Component,
    Card6Component,
    FooterComponent,
    BarriosComponent,
    HorariosComponent,
    CarrosComponent,
    ConductorsComponent,
    RutasAComponent,
    ConsejosAComponent,
    InicioAdmin1Component,
    NosotrosAComponent,
    ComunasComponent,
    ModalExitoComponent,
    ModalErrorComponent,
    EditarComunaComponent,
    EditarBarrioComponent,
    EditarHorarioComponent,
    EditarConductorComponent,
    EditarCarroComponent,
    EditarPerfilComponent,
    EditarConsejoComponent,
    UsuariosComponent,
    VideosComponent,
    EditarUsuarioComponent,
    EditarVideosComponent,
    SafePipe,
    RutasListComponent,
    EditarRutasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    //SocketIoModule.forRoot(config), 
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
