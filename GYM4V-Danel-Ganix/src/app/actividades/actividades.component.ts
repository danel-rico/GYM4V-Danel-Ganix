import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../servicios/actividad.service';
import { MonitorService } from '../servicios/monitor.service';
import { Actividad } from '../modelos/actividad';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
  imports: [CommonModule, CalendarComponent],
})
export class ActividadesComponent implements OnInit {
  activities: Actividad[] = [];
  monitors: string[] = [];
  currentDate: Date = new Date(); // Fecha actual para las actividades
  selectedCellIndex: number | null = null;
  newActivity: { type: string; monitors: string[] } = { type: '', monitors: [] };
  isEditing: boolean = false;

  activityRequirements: { type: string; requiredMonitors: number }[] = [
    { type: 'Spinning', requiredMonitors: 1 },
    { type: 'BodyPump', requiredMonitors: 2 },
    { type: 'Running', requiredMonitors: 1 },
    { type: 'Swimming', requiredMonitors: 3 },
  ];

  constructor(
    private actividadService: ActividadService,
    private monitorService: MonitorService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    this.monitorService.getMonitors().subscribe((data) => {
      this.monitors = data.map((monitor) => monitor.nombre);
    });
  }

  loadActivities(): void {
    const formattedDate = this.formatDate(this.currentDate);
    this.activities = this.actividadService.getActivitiesByDate(formattedDate);
  }

  changeDate(days: number): void {
    this.currentDate.setDate(this.currentDate.getDate() + days);
    this.loadActivities();
  }

  onDateChange(event: Event): void {
    this.currentDate = new Date((event.target as HTMLInputElement).value);
    this.loadActivities();
  }

  onDateSelected(selectedDate: Date): void {
    this.currentDate = new Date(selectedDate); // Actualiza la fecha seleccionada
    this.loadActivities(); // Recarga las actividades
  }

  openAddModal(cellIndex: number): void {
    this.selectedCellIndex = cellIndex;
    this.isEditing = false;
    this.newActivity = { type: '', monitors: [] };
    this.showModal();
  }

  openEditModal(index: number): void {
    this.selectedCellIndex = index;
    this.isEditing = true;
    const activity = this.activities[index];
    this.newActivity = { type: activity.type, monitors: [...activity.monitors] };
    this.showModal();
  }

  closeAddModal(): void {
    const modal = document.getElementById('addActivityModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  showModal(): void {
    const modal = document.getElementById('addActivityModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  validateActivity(): boolean {
    if (!this.newActivity.type) {
      alert('Debe seleccionar un tipo de actividad.');
      return false;
    }

    const requirement = this.activityRequirements.find(
      (req) => req.type === this.newActivity.type
    );

    if (!requirement) {
      alert('El tipo de actividad no es válido.');
      return false;
    }

    if (this.newActivity.monitors.length !== requirement.requiredMonitors) {
      alert(
        `El tipo de actividad "${this.newActivity.type}" requiere exactamente ${requirement.requiredMonitors} monitor(es).`
      );
      return false;
    }

    return true;
  }

  saveActivity(): void {
    if (!this.validateActivity()) {
      return;
    }

    const activity = new Actividad(
      this.activities[this.selectedCellIndex!].id,
      this.activities[this.selectedCellIndex!].time,
      this.newActivity.type,
      false,
      [...this.newActivity.monitors],
      this.formatDate(this.currentDate)
    );

    this.actividadService.updateActivity(this.formatDate(this.currentDate), this.selectedCellIndex!, activity);
    this.loadActivities();
    this.closeAddModal();
  }

  deleteActivity(index: number): void {
    const activity = this.activities[index];
    this.actividadService.updateActivity(
      this.formatDate(this.currentDate),
      index,
      new Actividad(activity.id, activity.time, '', true, [], this.formatDate(this.currentDate))
    );
    this.loadActivities();
  }

  onInputChange(event: Event, field: 'type'): void {
    this.newActivity[field] = (event.target as HTMLSelectElement).value;
  }

  onMonitorsChange(event: Event): void {
    const selectedOptions = Array.from((event.target as HTMLSelectElement).selectedOptions);
    this.newActivity.monitors = selectedOptions.map((option) => option.value);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  get formattedDate(): string {
    return this.currentDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
