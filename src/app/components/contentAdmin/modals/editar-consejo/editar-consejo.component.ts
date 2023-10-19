import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { ConsejosService } from 'src/app/services/user/consejos/consejos.service';

@Component({
  selector: 'app-editar-consejo',
  templateUrl: './editar-consejo.component.html',
  styleUrls: ['./editar-consejo.component.scss']
})
export class EditarConsejoComponent implements OnInit {

  @Input() id_consejo: number = 0;
  formulario: FormGroup;
  consejoConsultada: any = null;
  consejos: any = [];
  accionExito: string = '';
  accion: string = ''

  @ViewChild('updateConsejo')
  updateConsejo!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _consejosService : ConsejosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.consultarConsejo();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre_consejo : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      img : ['',[Validators.required]]
    })
  }

  consultarConsejo() {
    this._consejosService.getConsejos().subscribe(data => {
      this.consejos = data;
      this.consejoConsultada = this.consejos.find((element: { id: number; }) => element.id == this.id_consejo);
      console.log(this.consejoConsultada);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        nombre_consejo: [this.consejoConsultada?.nombre_consejo, [Validators.required]],
        descripcion: [this.consejoConsultada?.descripcion, [Validators.required]],
        //img: [this.consejoConsultada[0].img, [Validators.required]],
      });
      if (this.consejoConsultada) {
        this.updateConsejo.show();
      }
    });
  }

  update() {
    this.consejos = {
      id: this.consejoConsultada[0].id,
      nombre_consejo: this.formulario.value.nombre_consejo,
      descripcion: this.formulario.value.descripcion,
      //img: this.formulario.value.img,
      img: '../../../../../assets/ideas/ideas1.jpg',
    };

    this._consejosService.updateConsejo(this.consejos).subscribe(data => {
      this.consejos = data;
      console.log(this.consejos);
      if (this.consejos === 1) {
        this.accionExito = 'update';
        this.updateConsejo.hide();

      } else {
        this.updateConsejo.hide();
        this.accion = 'error';
      }
    })
  }


}
