import { Component, Input, OnInit } from '@angular/core';
import { Monitor } from '../modelos/monitor';
import { MonitorService } from '../servicios/monitor.service';
import { CommonModule } from '@angular/common';
import { CardMonitorComponent } from "../card-monitor/card-monitor.component";

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule, CardMonitorComponent],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarouselComponent implements OnInit {
  monitors: Monitor[] = [];       // Lista completa de monitores
  visibleMonitors: Monitor[] = []; // Monitores visibles en el carrusel
  currentIndex: number = 0;        // Índice del carrusel
  itemsPerPage: number = 3;        // Elementos visibles por página

  constructor(private monitorsService: MonitorService) {}

  ngOnInit(): void {
    this.loadMonitors();
  }

  loadMonitors(): void {
    this.monitorsService.getMonitors().subscribe((data: Monitor[]) => {
      this.monitors = data;
      this.updateVisibleMonitors();
    });
  }

  updateVisibleMonitors(): void {
    const start = this.currentIndex;
    const end = start + this.itemsPerPage;
    this.visibleMonitors = this.monitors.slice(start, end);
  }

  nextSlide(): void {
    if (this.currentIndex + 3 < this.monitors.length ) {
      this.currentIndex++;
      this.updateVisibleMonitors();
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0){
      this.currentIndex--;
      this.updateVisibleMonitors(); 
    }
  }
}
