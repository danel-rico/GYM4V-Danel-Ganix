import { Component, Input } from '@angular/core';
import { Monitor } from '../modelos/monitor';

@Component({
  selector: 'app-card-monitor',
  imports: [],
  templateUrl: './card-monitor.component.html',
  styleUrl: './card-monitor.component.scss'
})
export class CardMonitorComponent {
  @Input() monitor: Monitor | undefined ;

  
}
