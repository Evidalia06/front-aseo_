import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { VideosService } from 'src/app/services/user/videos/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  id_video : number = 0;
  videos : any = [];
  video : any = [];
  accionExito : string = "";
  accionError : string = "";

  searchText: string = '';
  previous: string = '';
  formulario : FormGroup;

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @ViewChild('insertVideos', { static: true })
  insertVideos!: ModalContainerComponent;

  @ViewChild('exito')
  exito!: ModalDirective;

  @ViewChild('error')
  error!: ModalDirective;

  constructor(private _videosService : VideosService, private formBuilder : FormBuilder) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }

  ngOnInit(): void {
    this._videosService.getVideos().subscribe(data => {
      this.videos = data;
      console.log(this.videos);
      this.mdbTable.setDataSource(this.videos);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      link: ['', [Validators.required]],
    })
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.videos = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.videos = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){
    this.video = {
      nombre: this.formulario.value.nombre,
      link: this.formulario.value.link,
    };
    console.log(this.video);

    this._videosService.setVideo(this.video).subscribe(data => {
      this.video = data;
      console.log(this.video);


      if (this.video === 23000) {
        this.insertVideos.hide();
        this.accionError = 'duplicate';
      } else if (Object.keys(this.video).length > 0) {
        this.insertVideos.hide();
        this.accionExito = 'insert';
      } else {
        this.insertVideos.hide();
        this.accionError = 'error';
      }
    })
  }

  editar(id:number){
    this.id_video = id;
  }

}
