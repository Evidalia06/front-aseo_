import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsejosService } from 'src/app/services/user/consejos/consejos.service';

@Component({
  selector: 'app-card5',
  templateUrl: './card5.component.html',
  styleUrls: ['./card5.component.scss']
})
export class Card5Component implements OnInit {

  consejos : any = []
  constructor(private ruta : Router, private _consejosService: ConsejosService) { }

  ngOnInit(): void {
    this._consejosService.getConsejos().subscribe(data => {
      this.consejos = data;
      console.log(this.consejos);
    })
  }

  redirectTo(uri: string) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.ruta.navigate([uri]));
  }

}
