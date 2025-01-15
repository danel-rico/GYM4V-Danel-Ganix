import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ActividadService } from '../servicios/actividad.service';
import { MonitorService } from '../servicios/monitor.service';
import { Actividad } from '../modelos/actividad';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
})
export class ActividadesComponent implements OnInit {
  activities: Actividad[] = [];
  monitors: string[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];
  selectedCellIndex: number | null = null;
  newActivity: { type: string; monitors: string[] } = { type: '', monitors: [] };
  isEditing: boolean = false;

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
    this.activities = this.actividadService.getActivitiesByDate(this.currentDate);
    if (!this.activities.length) {
      console.error('No se encontraron actividades para esta fecha.');
    }
  }
  

  changeDate(days: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + days);
    this.currentDate = newDate.toISOString().split('T')[0];
    this.loadActivities();
  }

  onDateChange(event: Event): void {
    this.currentDate = (event.target as HTMLInputElement).value;
    this.loadActivities();
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

  validateMonitors(type: string, monitors: string[]): boolean {
    const requiredMonitors = type === 'BodyPump' ? 2 : 1;
    return monitors.length === requiredMonitors;
  }

  saveActivity(): void {
    const activity = new Actividad(
      this.activities[this.selectedCellIndex!].id,
      this.activities[this.selectedCellIndex!].time,
      this.newActivity.type,
      false,
      [...this.newActivity.monitors],
      this.currentDate
    );

    this.actividadService.updateActivity(this.currentDate, this.selectedCellIndex!, activity);
    this.loadActivities();
    this.closeAddModal();
  }

  deleteActivity(index: number): void {
    const activity = this.activities[index];
    this.actividadService.updateActivity(
      this.currentDate,
      index,
      new Actividad(activity.id, activity.time, '', true, [], this.currentDate)
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
}
