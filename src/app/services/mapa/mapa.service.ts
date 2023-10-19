import { Injectable, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class MapaService {

  cbAddress: EventEmitter<any> = new EventEmitter();

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 4.814449828124537;
  lon = -75.69462675568582;
  zoom = 3;
  wayPoints: Array<any> = [];
  markerDriver: any = null;


  constructor(private http: HttpClient) {
    this.mapbox.accessToken = environment.mapPk;
  }

  buildOnlyMap(): Promise<any>{

    //Aqui se construye el mapa
    return new Promise((resolve, reject) => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: [this.lon, this.lat]
      });

      //botones de zoom
      //this.map.addControl(new mapboxgl.NavigationControl)

      resolve({
        map: this.map,
      });
    });
  }

  buildMap(): Promise<any> {

    //Aqui se construye el mapa
    return new Promise((resolve, reject) => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: [this.lon, this.lat]
      });

      //botones de zoom
      //this.map.addControl(new mapboxgl.NavigationControl)

      //Se controye el geocoder, input buscador
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: (mapboxgl as any)
      })

      geocoder.on('result', ($event) => {
        const { result } = $event;
        geocoder.clear();
        console.log($event);
        this.cbAddress.emit(result);
      })

      resolve({
        map: this.map,
        geocoder: geocoder
      });
    });
  }

  loadCoor(coords: any): void {
    console.log(coords);
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.mapPk}`,
    ].join('');

    this.http.get(url).subscribe((resp: any) => {
      const data = resp.routes[0];
      const route = data.geometry.coordinates;

      this.map?.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      });

      this.map?.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'red',
          'line-width': 5
        }
      });

      this.wayPoints = route;

      this.map?.fitBounds([route[0], route[route.length - 1]], {
        padding: 100
      });



    });

  }


  addMarker(coords: any) {
    console.log('entre: ', coords);

    const el = document.createElement('div');
    el.className = 'marker';
    this.markerDriver = new mapboxgl.Marker(el);
    this.markerDriver
      .setLngLat(coords)
      .addTo(this.map);

  }


}
