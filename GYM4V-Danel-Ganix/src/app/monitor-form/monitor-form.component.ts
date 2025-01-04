import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';






@Component({
  selector: 'app-monitor-form',
  imports: [FormsModule, MatFormFieldModule, MatIconModule],
  templateUrl: './monitor-form.component.html',
  styleUrl: './monitor-form.component.scss'
})
export class MonitorFormComponent {

  constructor(public dialogRef: MatDialogRef<MonitorFormComponent>) {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario enviado:', form.value);
      this.dialogRef.close(form.value); // Devuelve los datos del formulario al cerrar el diálogo
    }
  }
}
