import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';






@Component({
  selector: 'app-monitor-form',
  imports: [FormsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './monitor-form.component.html',
  styleUrl: './monitor-form.component.scss'
})
export class MonitorFormComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Formulario enviado:', this.formulario.value);
      alert('Formulario enviado con éxito!');
      this.formulario.reset(); // Resetea el formulario tras enviarlo
    }
  }

  onCancelar(): void {
    this.formulario.reset(); // Resetea el formulario al pulsar cancelar
    alert('Formulario cancelado');
  }
}
