import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarriohorarioComponent } from './components/content/barriohorario/barriohorario.component';
import { InicioComponent } from './components/content/inicio/inicio.component';
import { NosotrosComponent } from './components/content/nosotros/nosotros.component';
import { RutasComponent } from './components/content/rutas/rutas.component';
import { SeparacionComponent } from './components/content/separacion/separacion/separacion.component';
import { LayaoutComponent } from './components/layaout/layaout.component';
import { LayaoutAdminComponent } from './components/layaout-admin/layaout-admin.component';
import { LoginAdminComponent } from './components/contentAdmin/login-admin/login-admin.component';
import { Card1Component } from './components/content/cards/card1/card1.component';
import { Card2Component } from './components/content/cards/card2/card2.component';
import { Card3Component } from './components/content/cards/card3/card3.component';
import { Card4Component } from './components/content/cards/card4/card4.component';
import { Card5Component } from './components/content/cards/card5/card5.component';
import { Card6Component } from './components/content/cards/card6/card6.component';
import { InicioAdmin1Component } from './components/contentAdmin/inicio-admin1/inicio-admin1.component';
import { BarriosComponent } from './components/contentAdmin/barriosHorarios/barrios/barrios.component';
import { CarrosComponent } from './components/contentAdmin/allRutas/carros/carros.component';
import { RutasAComponent } from './components/contentAdmin/allRutas/rutas-a/rutas-a.component';
import { ConsejosAComponent } from './components/contentAdmin/consejos-a/consejos-a.component';
import { NosotrosAComponent } from './components/contentAdmin/nosotros-a/nosotros-a.component';
import { InicioAdminComponent } from './components/contentAdmin/inicio-admin/inicio-admin.component';
import { HorariosComponent } from './components/contentAdmin/barriosHorarios/horarios/horarios.component';
import { ComunasService } from './services/user/comunas/comunas.service';
import { ComunasComponent } from './components/contentAdmin/barriosHorarios/comunas/comunas.component';
import { ConductorsComponent } from './components/contentAdmin/allRutas/conductors/conductors.component';
import { UsuariosComponent } from './components/contentAdmin/usuarios/usuarios.component';
import { VideosComponent } from './components/contentAdmin/videos/videos.component';
import { RutasListComponent } from './components/contentAdmin/allRutas/rutas-list/rutas-list.component';

const routes: Routes = [
  {
    path: '', component: LayaoutComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'aseo/separacion', component: SeparacionComponent},
      { path: 'aseo/rutas', component: RutasComponent },
      { path: 'aseo/barriohorario', component: BarriohorarioComponent },
      { path: 'aseo/nosotros', component: NosotrosComponent, },
      { path: 'aseo/separacion/card1', component: Card1Component},
      { path: 'aseo/separacion/card2', component: Card2Component},
      { path: 'aseo/separacion/card3', component: Card3Component},
      { path: 'aseo/separacion/card4', component: Card4Component},
      { path: 'aseo/separacion/card5', component: Card5Component},
      { path: 'aseo/separacion/card6', component: Card6Component},
    ]
  },
  {
    path: 'admin', component: LayaoutAdminComponent, children: [
      { path: '', component: LoginAdminComponent },
      { path: 'inicio', component: InicioAdminComponent, children: [
        { path: 'inicio-admin', component: InicioAdmin1Component },
        { path: 'comunas', component: ComunasComponent },
        { path: 'barrios', component: BarriosComponent },
        { path: 'horarios', component: HorariosComponent },
        { path: 'carros', component: CarrosComponent },
        { path: 'conductores', component: ConductorsComponent },
        { path: 'rutas', component: RutasListComponent },
        { path: 'consejos', component: ConsejosAComponent },
        { path: 'videos', component: VideosComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'nosotros', component: NosotrosAComponent },
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
