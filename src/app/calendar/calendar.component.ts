import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [CommonModule],
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();

  currentDate: Date = new Date(); // Mes y año actuales
  selectedDate: Date | null = null; // Día seleccionado

  // Días de la semana (lunes a domingo)
  get daysOfWeek(): string[] {
    return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  }

  // Mes y año formateados en español
  get formattedMonthYear(): string {
    return this.currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }

  // Cambiar de mes
  changeMonth(monthChange: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthChange);
    this.currentDate = new Date(this.currentDate); // Forzar actualización
  }

  // Seleccionar un día del mes
  selectDate(day: number): void {
    const selected = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    this.selectedDate = new Date(Date.UTC(selected.getFullYear(), selected.getMonth(), selected.getDate())); // Establecemos en UTC
  }

  // Emitir la fecha seleccionada
  applyDate(): void {
    if (this.selectedDate) {
      this.dateSelected.emit(this.selectedDate); // Emitimos la fecha exacta
    }
  }

  // Obtener todos los días del mes (con espacios vacíos para el alineamiento)
  getDaysInMonth(): (number | null)[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Día de la semana del primer día del mes (lunes = 0, ..., domingo = 6)
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;

    // Número total de días en el mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Rellenamos los días del mes con espacios vacíos al principio
    const days: (number | null)[] = Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }
}
