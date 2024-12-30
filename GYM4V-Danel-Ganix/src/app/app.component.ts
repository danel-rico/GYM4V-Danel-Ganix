import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CardMonitorComponent } from "./card-monitor/card-monitor.component";
import {  CarouselComponent } from "./carrusel/carrusel.component";
import { BarraBusquedaAnyadirComponent } from "./barra-busqueda-anyadir/barra-busqueda-anyadir.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CardMonitorComponent, CarouselComponent, BarraBusquedaAnyadirComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GYM4V-Danel-Ganix';
}
