import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { ComunasService } from 'src/app/services/user/comunas/comunas.service';

@Component({
  selector: 'app-editar-comuna',
  templateUrl: './editar-comuna.component.html',
  styleUrls: ['./editar-comuna.component.scss']
})
export class EditarComunaComponent implements OnInit {

  @Input() id_comuna: number = 0;
  formulario : FormGroup;
  comunaConsultada : any = null;
  comunas : any = [];
  accionExito : string = '';
  accion : string = ''

  @ViewChild('updateComuna')
  updateComuna!: ModalDirective;


  constructor(private formBuilder : FormBuilder, private _comunasService : ComunasService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }

  ngOnInit(): void {
    //this.consultarComuna();
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    this.consultarComuna();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      comuna : ['',[Validators.required]],
    })
  }

  consultarComuna(){
    this._comunasService.getComunas().subscribe(data => {
      this.comunas = data;
      this.comunaConsultada = this.comunas.find((element: { id_comuna: number; }) => element.id_comuna == this.id_comuna);

      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        comuna:[this.comunaConsultada?.comuna, [Validators.required]],
      });
      if (this.comunaConsultada){
        this.updateComuna.show();
      } 
    });
  }

  update(){
    this.comunas = {
      id_comuna: this.comunaConsultada?.id_comuna,
      comuna: this.formulario.value.comuna
    };

    this._comunasService.updateComuna(this.comunas).subscribe(data => {
      this.comunas = data;
      if (this.comunas === 1) {
        this.accionExito = 'update';
        this.updateComuna.hide();

      } else {
        this.updateComuna.hide();
        this.accion = 'error';
      }
    })

  }


}
