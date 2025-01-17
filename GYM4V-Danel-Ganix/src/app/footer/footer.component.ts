import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule], // Asegúrate de incluir esto
})
export class FooterComponent {
  @Output() changeView = new EventEmitter<'monitores' | 'actividades'>();
  @Input() currentView!: 'monitores' | 'actividades';

  switchTo(view: 'monitores' | 'actividades') {
    this.changeView.emit(view);
  }

  isActive(view: 'monitores' | 'actividades'): boolean {
    return this.currentView === view;
  }
}