import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { HorariosService } from 'src/app/services/user/horarios/horarios.service';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.scss']
})
export class EditarHorarioComponent implements OnInit {

  @Input() id_horario: number = 0;
  formulario: FormGroup;
  horarioConsultada: any = null;
  horarios: any = [];
  accionExito: string = '';
  accion: string = ''

  @ViewChild('updateHorario')
  updateHorario!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _horariosService: HorariosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
    //this.consultarComuna();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.consultarHorario();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      dia: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['22:15', [Validators.required]]
    })
  }

  consultarHorario() {
    this._horariosService.getHorarios().subscribe(data => {
      this.horarios = data;
      this.horarioConsultada = this.horarios.find((element: { id_horario: number; }) => element.id_horario == this.id_horario);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        dia: [this.horarioConsultada?.dia, [Validators.required]],
        hora_inicio: [this.horarioConsultada?.hora_inicio, [Validators.required]],
        hora_fin: [this.horarioConsultada?.hora_fin, [Validators.required]]
      });
      if (this.horarioConsultada) {
        this.updateHorario.show();
      }
    });
  }

  update() {
    this.horarios = {
      id_horario: this.horarioConsultada?.id_horario,
      dia: this.formulario.value.dia,
      hora_inicio: this.formulario.value.hora_inicio,
      hora_fin: this.formulario.value.hora_fin
    };

    this._horariosService.updateHorario(this.horarios).subscribe(data => {
      this.horarios = data;
      if (this.horarios === 1) {
        this.accionExito = 'update';
        this.updateHorario.hide();

      } else {
        this.updateHorario.hide();
        this.accion = 'error';
      }
    })

  }

}
