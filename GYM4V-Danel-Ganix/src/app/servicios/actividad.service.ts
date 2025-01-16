import { Injectable } from '@angular/core';
import { Actividad } from '../modelos/actividad';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private activities: Record<string, Actividad[]> = {};

  // Configuración de tipos de actividad, monitores requeridos e íconos
  private activityRequirements: { type: string; requiredMonitors: number; icon: string }[] = [
    { type: 'Spinning', requiredMonitors: 1, icon: 'fa-solid fa-bicycle' },
    { type: 'BodyPump', requiredMonitors: 2, icon: 'fa-solid fa-dumbbell' },
    { type: 'Running', requiredMonitors: 1, icon: 'fa-solid fa-person-running' },
    { type: 'Swimming', requiredMonitors: 3, icon: 'fa-solid fa-person-swimming' },
  ];

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

    this.activities[today] = [
      new Actividad(1, '10:00 - 11:30', 'Spinning', false, ['Miguel Goyena'], today, 'fa-solid fa-bicycle'),
      new Actividad(2, '13:30 - 15:00', '', true, [], today), // FREE
      new Actividad(3, '17:30 - 19:00', 'BodyPump', false, ['Lourdes Dominguez', 'Joaquin Rodriguez'], today, 'fa-solid fa-dumbbell'),
    ];

    this.activities[tomorrow] = [
      new Actividad(1, '10:00 - 11:30', 'Running', false, ['Amaia Ayucar'], tomorrow, 'fa-solid fa-person-running'),
      new Actividad(2, '13:30 - 15:00', 'Swimming', false, ['Miguel Goyena', 'Lourdes Dominguez', 'Joaquin Rodriguez'], tomorrow, 'fa-solid fa-person-swimming'),
      new Actividad(3, '17:30 - 19:00', '', true, [], tomorrow),
    ];
  }

  getActivitiesByDate(date: string): Actividad[] {
    if (!this.activities[date]) {
      this.activities[date] = [
        new Actividad(1, '10:00 - 11:30', '', true, [], date),
        new Actividad(2, '13:30 - 15:00', '', true, [], date),
        new Actividad(3, '17:30 - 19:00', '', true, [], date),
      ];
    }
    return this.activities[date];
  }

  updateActivity(date: string, index: number, activity: Actividad): void {
    if (this.activities[date]) {
      this.activities[date][index] = activity;
    }
  }

  // Método para devolver los requisitos de actividades
  getActivityRequirements(): { type: string; requiredMonitors: number; icon: string }[] {
    return this.activityRequirements;
  }
}
