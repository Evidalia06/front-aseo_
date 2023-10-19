import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { BarriosService } from 'src/app/services/user/barrios/barrios.service';
import { ComunasService } from 'src/app/services/user/comunas/comunas.service';

@Component({
  selector: 'app-editar-barrio',
  templateUrl: './editar-barrio.component.html',
  styleUrls: ['./editar-barrio.component.scss']
})
export class EditarBarrioComponent implements OnInit {

  @Input() id_barrio: number = 0;
  formulario : FormGroup;
  comunas : any = [];
  barrioConsultada : any = null;
  barrios : any = [];
  accionExito : string = '';
  accion : string = ''

  @ViewChild('updateBarrio')
  updateBarrio!: ModalDirective;


  constructor(private formBuilder : FormBuilder, private _barriosService : BarriosService, private _comunasService : ComunasService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
    this._comunasService.getComunas().subscribe(data => {
      this.comunas = data;
    })
   }

  ngOnInit(): void {
    //this.consultarComuna();
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    this.consultarBarrio();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre_comuna : ['',[Validators.required]],
      barrio : ['',[Validators.required]],
    })
  }

  consultarBarrio(){
    this._barriosService.getBarrios().subscribe(data => {
      this.barrios = data;
      this.barrioConsultada = this.barrios.find((element: { id: number; }) => element.id == this.id_barrio);
      console.log(this.barrioConsultada);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        nombre_comuna:[this.barrioConsultada?.nombre_comuna, [Validators.required]],
        barrio : [this.barrioConsultada?.barrio, Validators.required]
      });
      if (this.barrioConsultada){
        this.updateBarrio.show();
      } 
    });
  }

  update(){
    this.barrios = {
      id: this.barrioConsultada?.id,
      nombre_comuna: this.formulario.value.comuna,
      barrio : this.formulario.value.barrio
    };

    this._barriosService.updateBarrio(this.barrios).subscribe(data => {
      this.barrios = data;
      if (this.barrios === 1) {
        this.accionExito = 'update';
        this.updateBarrio.hide();

      } else {
        this.updateBarrio.hide();
        this.accion = 'error';
      }
    })

  }

}
