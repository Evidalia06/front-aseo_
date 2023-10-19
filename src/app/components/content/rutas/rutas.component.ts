import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Barrio } from 'src/app/interfaces/user/barrio';
import { Rutas } from 'src/app/interfaces/user/rutas';
import { MapaService } from 'src/app/services/mapa/mapa.service';
import { BarriosService } from 'src/app/services/user/barrios/barrios.service';
import { ComunasService } from 'src/app/services/user/comunas/comunas.service';
import { RutasService } from 'src/app/services/user/rutas/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  mostrarHorario = false;
  validarComuna = true;
  validarBarrio = false;
  validarBarrioTag = false;
  validarRuta = false;
  errorComuna = false;
  errorBarrio = false;
  errorRuta = false;
  rutas: any = [];
  rutaconsultada : Rutas[] = [];
  barrios: Barrio[] = [];
  comunas: any = [];
  formulario: FormGroup;

  constructor(private _mapaservice: MapaService, private _rutaservice: RutasService, private formBuilder: FormBuilder,
    private _barriosService: BarriosService, private _comunasService: ComunasService, private ruta : Router) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
    this._mapaservice.buildMap()
      .then((data) => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

    this._rutaservice.getRutas().subscribe((data) => {
      this.rutas = data;
    });

    this._barriosService.getBarrios().subscribe((data:Barrio[]) => {
      this.barrios = data;
    });

    this._comunasService.getComunas().subscribe(data => {
      this.comunas = data;
    });
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      comuna: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      ruta: ['', [Validators.required]]
    })
  }

  drawRoute() {
    console.log('draw');
    const coords = [[
      this.rutaconsultada[0].inicioLng,
      this.rutaconsultada[0].inicioLat
    ],
    [
      this.rutaconsultada[0].finLng,
      this.rutaconsultada[0].finLat
    ]
    ]
    console.log(coords);
    this._mapaservice.loadCoor(coords);
  }

  continuarComuna() {
    console.log(this.formulario.value.comuna);
    if (this.formulario.value.comuna == '') {
      this.errorComuna = true;
    } else {
      this.validarComuna = false;
      this.validarBarrio = true;
      this.validarBarrioTag = true;
      this.errorComuna = false;
      console.log(this.barrios);
      this.barrios = this.barrios.filter((element: { nombre_comuna: any; }) => element.nombre_comuna == this.formulario.value.comuna);
      console.log(this.barrios);
    }


  }
  continuarBarrio() {
    if (this.formulario.value.barrio == '') {
      this.errorBarrio = true;
    } else {
      this.validarBarrio = false;
      this.errorBarrio = false;
      this.validarRuta = true;
      console.log(this.formulario.value.barrio);
      this.rutas = this.rutas.filter((element: { barrio: any; }) => element.barrio == this.formulario.value.barrio);
      console.log(this.rutaconsultada);
    }
  }

  continuarRuta() {

    if (this.formulario.value.ruta == '') {
      this.errorRuta = true;
    } else {
      this.rutaconsultada = this.rutas.filter((element: { id_ruta: any; }) => element.id_ruta == this.formulario.value.ruta);
      this.mostrarHorario = true;
      this.drawRoute();
    }
  }

  redirectTo(uri: string) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.ruta.navigate([uri]));
  }

}
