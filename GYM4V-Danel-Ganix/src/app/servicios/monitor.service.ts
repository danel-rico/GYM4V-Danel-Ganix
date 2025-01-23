import { Injectable } from '@angular/core';
import { Monitor } from '../modelos/monitor';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { flushMicrotasks } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  nombreIntroducido: string = "";
  private monitorsPorNombre: Monitor[] = [];

  private monitors: Monitor[] = [
    { nombre: 'Miguel Goyena', email: 'miguel_goyena@cuatrovientos.org', telefono: '643231413', foto: 'd' },
    { nombre: 'Lourdes Dominguez', email: 'ldominguez@gmail.com', telefono: '643231413', foto: 'd' },
    { nombre: 'Joaquin Rodriguez', email: 'jrodri@hotmail.es', telefono: '643231413', foto: 'd' },
    { nombre: 'Amaia Ayucar', email: 'amaiaayucar@hotmail', telefono: '643231413', foto: 'd' },
  ];
  getMonitors(): Observable<Monitor[]> {
    return of(this.monitors); 
  }

  addMonitor(monitor: { nombre: string; email: string; telefono: string; foto: "d" }) {
    this.monitors.push(monitor);
  }
  deleteMonitorByName(nombre: string): void {
    const index = this.monitors.findIndex((monitor) => monitor.nombre === nombre);
    if (index !== -1) {
      this.monitors.splice(index, 1);
    }
  }
  editMonitorByName(nombre: string, monitorNuevo: Monitor): void {
    for (let monitor of this.monitors) {
      if (monitor.nombre == nombre) {
        monitor.nombre = monitorNuevo.nombre;
        monitor.email = monitorNuevo.email;
        monitor.telefono = monitorNuevo.telefono;
      }
    }
  }
  monitorsByName(nombre: string): void{
    if (nombre == "" || nombre == null) {
      
    }
  }
}
