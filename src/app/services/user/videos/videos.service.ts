import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/interfaces/user/video';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  ruta = (environment.api)+'getVideos';
  rutaSetVideo = (environment.api)+'setVideo';
  rutaUpdateVideo = (environment.api)+'updateVideo';

  constructor(private http: HttpClient) { }

  getVideos() : Observable<Video>{
    return this.http.get<Video>(this.ruta); 
  }

  setVideo(video: any) {
    return this.http.post(this.rutaSetVideo, video);
  }

  updateVideo(video: any) {
    return this.http.post(this.rutaUpdateVideo, video);
  }
}
