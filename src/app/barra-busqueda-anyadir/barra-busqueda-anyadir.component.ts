import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MonitorFormComponent } from '../monitor-form/monitor-form.component';
import { MonitorService } from '../servicios/monitor.service';


@Component({
  selector: 'app-barra-busqueda-anyadir',
  imports: [MatDialogModule],
  templateUrl: './barra-busqueda-anyadir.component.html',
  styleUrl: './barra-busqueda-anyadir.component.scss'
})
export class BarraBusquedaAnyadirComponent {
  monitores: any[] = []; // Array para guardar los monitores

  constructor(public dialog: MatDialog, private monitorService: MonitorService) { }

  addMonitor() {
    const dialogRef = this.dialog.open(MonitorFormComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.monitores.push(result); // Añade el monitor al array
        console.log('Monitor añadido:', result);
      }
    });
  }
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
  }

}
