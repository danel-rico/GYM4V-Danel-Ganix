import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monitor } from '../modelos/monitor';
import { MonitorService } from '../servicios/monitor.service';

@Component({
  selector: 'app-card-monitor',
  imports: [],
  templateUrl: './card-monitor.component.html',
  styleUrl: './card-monitor.component.scss'
})
export class CardMonitorComponent {
  @Input() monitor: Monitor | undefined ;
  @Output() eliminar = new EventEmitter<string>();
  @Output() editar = new EventEmitter<string>();

  constructor(private monitorService: MonitorService) {}
  onEliminar(): void {
    if (this.monitor) {
      this.eliminar.emit(this.monitor.nombre);
    }
  }
  onEditar(): void{
    if(this.monitor){
      this.editar.emit(this.monitor.nombre);
    }
  }
}