import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  images = ['../../../assets/Inicio/ini.jpg', '../../../assets/Inicio/inic.jpg', '../../../assets/Inicio/inice.jpg'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
