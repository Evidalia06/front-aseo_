import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { VideosService } from 'src/app/services/user/videos/videos.service';

@Component({
  selector: 'app-editar-videos',
  templateUrl: './editar-videos.component.html',
  styleUrls: ['./editar-videos.component.scss']
})
export class EditarVideosComponent implements OnInit {

  @Input() id_video: number = 0;
  formulario: FormGroup;
  videoConsultado: any = null;
  videos: any = [];
  accionExito: string = '';
  accionError: string = ''

  @ViewChild('updateVideos')
  updateVideos!: ModalDirective;


  constructor(private formBuilder: FormBuilder, private _videosService : VideosService) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.consultarUsuario();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      link: ['', [Validators.required]],
    })
  }

  consultarUsuario() {
    this._videosService.getVideos().subscribe(data => {
      this.videos = data;
      this.videoConsultado = this.videos.find((element: { id_video: number; }) => element.id_video == this.id_video);
      this.formulario = this.formBuilder.group({
        // llena los campos son los de html
        nombre: [this.videoConsultado?.nombre, [Validators.required]],
        link: [this.videoConsultado?.link, [Validators.required]],
      });
      if (this.videoConsultado) {
        this.updateVideos.show();
      }
    });
  }

  update() {
    this.videos = {
      id_video: this.videoConsultado?.id_video,
      nombre: this.formulario.value.nombre,
      link: this.formulario.value.link,

    };

    this._videosService.updateVideo(this.videos).subscribe(data => {
      this.videos = data;
      console.log(this.videos);
      if (this.videos === 1) {
        this.accionExito = 'update';
        this.updateVideos.hide();

      } else {
        this.updateVideos.hide();
        this.accionError = 'error';
      }
    })

  }


}
