import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Output() changeView = new EventEmitter<'monitores' | 'actividades'>();

  switchTo(view: 'monitores' | 'actividades') {
    this.changeView.emit(view);
  }
}
