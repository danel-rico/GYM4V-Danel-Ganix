import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { CardMonitorComponent } from "./card-monitor/card-monitor.component";
import { CarruselComponent } from "./carrusel/carrusel.component";
import { BarraBusquedaAnyadirComponent } from "./barra-busqueda-anyadir/barra-busqueda-anyadir.component";
import { ActividadesComponent } from "./actividades/actividades.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavbarComponent,
    CarruselComponent,
    BarraBusquedaAnyadirComponent,
    ActividadesComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GYM4V-Danel-Ganix';
  view: 'monitores' | 'actividades' = 'monitores'; 

  setView(view: 'monitores' | 'actividades') {
    this.view = view;
  }
}
