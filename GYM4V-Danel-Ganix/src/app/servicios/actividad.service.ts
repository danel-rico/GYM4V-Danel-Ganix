import { Injectable } from '@angular/core';
import { Actividad } from '../modelos/actividad';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private activities: Record<string, Actividad[]> = {};

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

    this.activities[today] = [
      new Actividad(1, '10:00 - 11:30', 'Spinning', false, ['Miguel Goyena']),
      new Actividad(2, '13:30 - 15:00', 'BodyPump', false, ['Lourdes Dominguez', 'Joaquin Rodriguez']),
      new Actividad(3, '17:30 - 19:00', '', true, []),
    ];

    this.activities[tomorrow] = [
      new Actividad(1, '10:00 - 11:30', 'Cycling', false, ['Amaia Ayucar']),
      new Actividad(2, '13:30 - 15:00', 'Yoga', false, ['Miguel Goyena']),
      new Actividad(3, '17:30 - 19:00', '', true, []),
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
}
