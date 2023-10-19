import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Barrio } from 'src/app/interfaces/user/barrio';
import { Horario } from 'src/app/interfaces/user/horario';
import { WayPoints } from 'src/app/interfaces/way-points';
import { MapaService } from 'src/app/services/mapa/mapa.service';
import { BarriosService } from 'src/app/services/user/barrios/barrios.service';
import { CarrosService } from 'src/app/services/user/carros/carros.service';
import { ConductorsService } from 'src/app/services/user/conductors/conductors.service';
import { HorariosService } from 'src/app/services/user/horarios/horarios.service';
import { RutasService } from 'src/app/services/user/rutas/rutas.service';

@Component({
  selector: 'app-rutas-a',
  templateUrl: './rutas-a.component.html',
  styleUrls: ['./rutas-a.component.scss']
})
export class RutasAComponent implements OnInit {

  @Input() abrir: number = 0;
  @ViewChild('asGeocoder') asGeocoder: ElementRef | undefined;

  wayPoints: WayPoints = { start: null, end: null };
  modeInput = 'start';
  inicio = '';
  fin = '';
  accionError = '';
  formulario: FormGroup;
  barrios: Barrio[] = [];
  horarios: any = [];
  conductores: any = [];
  carros: any = [];
  rutas: any = {};
  accionExito = '';


  @ViewChild('insertRuta')
  insertRuta!: ModalDirective;

  constructor(private _mapaservice: MapaService, private renderer2: Renderer2, private formBuilder: FormBuilder,
    private _barriosService: BarriosService, private _horariosService: HorariosService, private _rutaservice: RutasService,
    private _conductorsService: ConductorsService, private _carrosService: CarrosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.insertRuta.show();
  }

  ngOnInit(): void {
    this.mostrarMapa();
    this._barriosService.getBarrios().subscribe((data: Barrio[]) => {
      this.barrios = data;

    });

    this._horariosService.getHorarios().subscribe(data => {
      this.horarios = data;

    });

    this._conductorsService.getConductores().subscribe(data => {
      this.conductores = data;

    });

    this._carrosService.getCarros().subscribe(data => {
      this.carros = data;

    });

  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre_ruta: ['', [Validators.required]],
      conductor: ['', [Validators.required]],
      carro: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      horario: ['', [Validators.required]],
    })
  }

  mostrarMapa(){
    this._mapaservice.buildMap()
      .then(({ geocoder, map }) => {
        this.renderer2.appendChild(this.asGeocoder?.nativeElement,
          geocoder.onAdd(map));
      })
      .catch(error => {
        console.error(error);
      })

    //obtiene las coordenadas del geocoder
    this._mapaservice.cbAddress.subscribe((getPoint) => {
      console.log('holi', getPoint);
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
        this.inicio = this.wayPoints.start.place_name;

      } else if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
        this.fin = this.wayPoints.end.place_name;
      }
    });
  }

  drawRoute() {
    if (this.wayPoints.start == null && this.wayPoints.end == null) {
      this.accionError = 'faltanRutas';
    } else if (this.wayPoints.start == null || this.wayPoints.end == null) {
      this.accionError = 'faltaRuta';
    } else {
      const coords = [
        this.wayPoints.start.center,
        this.wayPoints.end.center
      ];
      this._mapaservice.loadCoor(coords);
    }

  }

  changeMode(mode: string) {
    this.modeInput = mode;
  }

  test() {
    this._mapaservice.addMarker([-75.69462675568582, 4.814449828124537]);
  }

  setRuta() {
    if (this.wayPoints.start == null && this.wayPoints.end == null) {
      this.accionError = 'faltanRutas';
    } else if (this.wayPoints.start == null || this.wayPoints.end == null) {
      this.accionError = 'faltaRuta';
    } else {
      this.rutas = {
        nombre_ruta: this.formulario.value.nombre_ruta,
        inicioLng: this.wayPoints.start.center[0],
        inicioLat: this.wayPoints.start.center[1],
        finLng: this.wayPoints.end.center[0],
        finLat: this.wayPoints.end.center[1],
        conductor: this.formulario.value.conductor,
        carro: this.formulario.value.carro,
        barrio: this.formulario.value.barrio,
        horario: this.formulario.value.horario
      }

      this._rutaservice.setRutas(this.rutas).subscribe(rutas => {
        console.log(rutas);
        this.rutas = rutas;
        if (this.rutas === 23000) {
          this.accionError = 'duplicate';
        } else if (Object.keys(this.rutas).length > 0) {
          this.accionExito = 'insert';
        } else {
          this.accionError = 'error';
        }
      })


      console.log(this.rutas);
      console.log(this.wayPoints.start.center[0]);
      console.log(this.wayPoints.start.center[1]);
      console.log(this.wayPoints.end.center[0]);
      console.log(this.wayPoints.end.center[1]);
    }



  }
}
