import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VideosService } from 'src/app/services/user/videos/videos.service';

@Component({
  selector: 'app-card6',
  templateUrl: './card6.component.html',
  styleUrls: ['./card6.component.scss']
})
export class Card6Component implements OnInit, PipeTransform {

  @Pipe({
    name: 'safe'
  })

  videos: any = [];
  video1: any = '';
  link: any = '';
  constructor(private ruta: Router, private _videosService: VideosService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._videosService.getVideos().subscribe(videos => {
      this.videos = videos;
    })
  }

  transform(url  :any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getSafeUrl(url : any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  redirectTo(uri: string) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.ruta.navigate([uri]));
  }

  

}
