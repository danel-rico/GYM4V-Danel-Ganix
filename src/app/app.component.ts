import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { CardMonitorComponent } from "./card-monitor/card-monitor.component";
import { CarruselComponent } from "./carrusel/carrusel.component";
import { BarraBusquedaAnyadirComponent } from "./barra-busqueda-anyadir/barra-busqueda-anyadir.component";
import { ActividadesComponent } from "./actividades/actividades.component";
import { FooterComponent } from "./footer/footer.component";
import { MonitorService } from './servicios/monitor.service';
import { Monitor } from './modelos/monitor';
import { SearchAddBarComponent } from "./search-add-bar/search-add-bar.component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavbarComponent,
    CarruselComponent,
    ActividadesComponent,
    FooterComponent,
    SearchAddBarComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GYM4V-Danel-Ganix';
  view: 'monitores' | 'actividades' = 'monitores';

  monitors: Monitor[] = []; 
  constructor(private monitorService: MonitorService) { }
  setView(view: 'monitores' | 'actividades') {
    this.view = view;
  }

  
}
