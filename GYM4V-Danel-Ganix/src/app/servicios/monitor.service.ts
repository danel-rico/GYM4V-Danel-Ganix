import { Injectable } from '@angular/core';
import { Monitor } from '../modelos/monitor';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private monitors: Monitor[] = [
    { nombre: 'Miguel Goyena', email: 'miguel_goyena@cuatrovientos.org', telefono: '643231413', foto: 'd' },
    { nombre: 'Lourdes Dominguez', email: 'ldominguez@gmail.com', telefono: '643231413', foto: 'd' },
    { nombre: 'Joaquin Rodriguez', email: 'jrodri@hotmail.es', telefono: '643231413', foto: 'd' },
    { nombre: 'Amaia Ayucar', email: 'amaiaayucar@hotmail', telefono: '643231413', foto: 'd'},
  ];
  getMonitors(): Observable<Monitor[]> {
    return of(this.monitors);
  }
}
