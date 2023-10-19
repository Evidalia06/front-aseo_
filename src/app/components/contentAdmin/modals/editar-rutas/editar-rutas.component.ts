import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Barrio } from 'src/app/interfaces/user/barrio';
import { Rutas } from 'src/app/interfaces/user/rutas';
import { BarriosService } from 'src/app/services/user/barrios/barrios.service';
import { CarrosService } from 'src/app/services/user/carros/carros.service';
import { ConductorsService } from 'src/app/services/user/conductors/conductors.service';
import { HorariosService } from 'src/app/services/user/horarios/horarios.service';
import { RutasService } from 'src/app/services/user/rutas/rutas.service';

@Component({
  selector: 'app-editar-rutas',
  templateUrl: './editar-rutas.component.html',
  styleUrls: ['./editar-rutas.component.scss']
})
export class EditarRutasComponent implements OnInit {

  @Input() id_ruta: number = 0;

  accionError = '';
  formulario: FormGroup;
  barrios: Barrio[] = [];
  horarios: any = [];
  conductores: any = [];
  carros: any = [];
  rutas: any = {};
  accionExito = '';
  rutaconsultada: any = null;


  @ViewChild('updateRuta')
  updateRuta!: ModalDirective;

  constructor(private formBuilder: FormBuilder, private _barriosService: BarriosService,
    private _horariosService: HorariosService, private _rutaservice: RutasService,
    private _conductorsService: ConductorsService, private _carrosService: CarrosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.consultarRuta();
  }

  ngOnInit(): void {
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
      inicioLng: ['', [Validators.required]],
      inicioLat: ['', [Validators.required]],
      finLng: ['', [Validators.required]],
      finLat: ['', [Validators.required]],
      conductor: ['', [Validators.required]],
      carro: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      horario: ['', [Validators.required]],
    })
  }

  consultarRuta() {
    this._rutaservice.getRutas().subscribe(data => {
      this.rutas = data;
      this.rutaconsultada = this.rutas.find((element: { id_ruta: any; }) => element.id_ruta == this.id_ruta);
      console.log(this.rutaconsultada);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        nombre_ruta: [this.rutaconsultada?.nombre_ruta, [Validators.required]],
        inicioLng: [this.rutaconsultada?.inicioLng, [Validators.required]],
        inicioLat: [this.rutaconsultada?.inicioLat, [Validators.required]],
        finLng: [this.rutaconsultada?.finLng, [Validators.required]],
        finLat: [this.rutaconsultada?.finLat, [Validators.required]],
        conductor: [this.rutaconsultada?.conductor, [Validators.required]],
        carro: [this.rutaconsultada?.carro, [Validators.required]],
        barrio: [this.rutaconsultada?.id, [Validators.required]],
        horario: [this.rutaconsultada?.horario, [Validators.required]],
      });
      if (this.rutaconsultada) {
        this.updateRuta.show();
      }
    })

  }

  update() {

    console.log(this.formulario.value.barrio);
    this.rutas = {
      id_ruta: this.rutaconsultada?.id_ruta,
      nombre_ruta: this.formulario.value.nombre_ruta,
      inicioLng: this.formulario.value.inicioLng,
      inicioLat: this.formulario.value.inicioLat,
      finLng: this.formulario.value.finLng,
      finLat: this.formulario.value.finLat,
      conductor: this.formulario.value.conductor,
      carro: this.formulario.value.carro,
      barrio: this.formulario.value.barrio,
      horario: this.formulario.value.horario
    }

    this._rutaservice.updateRuta(this.rutas).subscribe(rutas => {
      console.log(rutas);
      this.rutas = rutas;
      if (this.rutas === 23000) {
        this.accionError = 'duplicate';
      } else if (this.rutas === 1) {
        this.accionExito = 'insert';
      } else {
        this.accionError = 'error';
      }
    })

  }





}
