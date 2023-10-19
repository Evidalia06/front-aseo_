import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { CarrosService } from 'src/app/services/user/carros/carros.service';

@Component({
  selector: 'app-editar-carro',
  templateUrl: './editar-carro.component.html',
  styleUrls: ['./editar-carro.component.scss']
})
export class EditarCarroComponent implements OnInit {

  @Input() id_carro: number = 0;
  formulario: FormGroup;
  carroConsultada: any = null;
  carros: any = [];
  accionExito: string = '';
  accion: string = ''

  @ViewChild('updateCarro')
  updateCarro!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _carrosService : CarrosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.consultarCarro();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      marca : ['',[Validators.required]],
      modelo : ['',[Validators.required]],
      placa : ['',[Validators.required]],
      ciudad_placa : ['',[Validators.required]]
    })
  }

  consultarCarro() {
    this._carrosService.getCarros().subscribe(data => {
      this.carros = data;
      this.carroConsultada = this.carros.find((element: { id: number; }) => element.id == this.id_carro);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        marca: [this.carroConsultada?.marca, [Validators.required]],
        modelo: [this.carroConsultada?.modelo, [Validators.required]],
        placa: [this.carroConsultada?.placa, [Validators.required]],
        ciudad_placa: [this.carroConsultada?.ciudad_placa, [Validators.required]]
      });
      if (this.carroConsultada) {
        this.updateCarro.show();
      }
    });
  }

  update() {
    this.carros = {
      id: this.carroConsultada?.id,
      marca: this.formulario.value.marca,
      modelo: this.formulario.value.modelo,
      placa: this.formulario.value.placa,
      ciudad_placa: this.formulario.value.ciudad_placa
    };

    this._carrosService.updateCarro(this.carros).subscribe(data => {
      this.carros = data;
      if (this.carros === 1) {
        this.accionExito = 'update';
        this.updateCarro.hide();

      } else {
        this.updateCarro.hide();
        this.accion = 'error';
      }
    })

  }

}
