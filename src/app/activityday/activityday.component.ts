import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-day',
  templateUrl: './activityday.component.html',
  styleUrls: ['./activityday.component.scss'],
  imports: [CommonModule],
})
export class ActivityDayComponent {
  @Input() currentDate!: Date; // Recibe la fecha actual desde el componente padre
  @Output() dateChange = new EventEmitter<number>(); // Emitimos el cambio de fecha

  // Devolver la fecha formateada como "Día, Mes Año"
  get formattedDate(): string {
    return this.currentDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  // Cambiar el día actual
  changeDate(days: number): void {
    this.dateChange.emit(days); // Emitimos el cambio en días (+1 o -1)
  }
}
