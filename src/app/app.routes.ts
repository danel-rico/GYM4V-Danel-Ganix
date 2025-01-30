import { Routes } from '@angular/router';
import { CardMonitorComponent } from './card-monitor/card-monitor.component';
import { ActividadesComponent } from './actividades/actividades.component';

export const routes: Routes = [
  { path: 'monitores', component: CardMonitorComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: '', redirectTo: 'monitores', pathMatch: 'full' },
];
