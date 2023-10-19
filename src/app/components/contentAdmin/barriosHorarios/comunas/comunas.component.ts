import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ComunasService } from 'src/app/services/user/comunas/comunas.service';
import { MdbTableDirective, ModalContainerComponent, ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comunas',
  templateUrl: './comunas.component.html',
  styleUrls: ['./comunas.component.scss']
})
export class ComunasComponent implements OnInit {

  comunas : any = [];
  comuna : any = [];
  accion = '';
  accionExito = '';
  id_comuna : number = 0;

  searchText: string = '';
  previous: string = '';
  formulario : FormGroup;

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  @ViewChild('insertComuna', { static: false })
  insertComuna!: ModalContainerComponent;

  constructor(private _comunasService : ComunasService, private formBuilder : FormBuilder,
    private ruta: Router) {
    this.formulario = new FormGroup({});
    this.crearFormulario();
   }

  ngOnInit(): void {
    this._comunasService.getComunas().subscribe(data => {
      this.comunas = data;
      this.mdbTable.setDataSource(this.comunas);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      comuna : ['',[Validators.required]],
    })
  }

  //Buscar en la tabla
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.comunas = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.comunas = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  insertar(){
    this.comuna = {
      comuna: this.formulario.value.comuna,
    };

    this._comunasService.setComuna(this.comuna).subscribe(data => {
      this.comuna = data;

      console.log(this.comuna);
      if (this.comuna === 23000) {
        console.log('entreeee');
        this.insertComuna.hide();
        this.accion = 'duplicate';
      }else if (Object.keys(this.comuna).length > 0) {
        this.insertComuna.hide();
        this.accionExito = 'insert';
        console.log(this.accionExito);
      } else if(this.comuna != 23000){
        this.insertComuna.hide();
        this.accion = 'error';
      }
    })
  }

  redirectTo(uri: string) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.ruta.navigate([uri]));
  }

  editar(id:number){
    this.id_comuna = id;
  }

}
