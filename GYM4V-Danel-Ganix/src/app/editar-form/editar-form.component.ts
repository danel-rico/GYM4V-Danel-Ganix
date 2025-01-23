import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Monitor } from '../modelos/monitor';
import { MonitorService } from '../servicios/monitor.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editar-form',
  imports: [FormsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './editar-form.component.html',
  styleUrl: './editar-form.component.scss'
})
export class EditarFormComponent {
  monitors: Monitor[] = [];
  formData: string = '';
  formulario: FormGroup;
  nombre: string = '';

  constructor(private dialogRef: MatDialogRef<EditarFormComponent>, @Inject(MAT_DIALOG_DATA) name: string, private fb: FormBuilder, private monitorsService: MonitorService) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    });
    this.nombre = name;

    
  }
  ngOnInit(): void {
    this.loadMonitors();
    
  }

  loadMonitors(): void {
    this.monitorsService.getMonitors().subscribe((data: Monitor[]) => {
      this.monitors = data;
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const nuevoMonitor = this.formulario.value;
      
      //Vamos a comprobar que no exista un monitor con el mismo nombre
      for(let monitor of this.monitors) {
        if(monitor.nombre.toUpperCase() == nuevoMonitor.nombre.toUpperCase()) {
          alert('Ya existe un monitor con ese nombre');
          return;
        }
      }
      // Llamamos al servicio para añadir el monitor
      this.monitorsService.editMonitorByName(this.nombre,nuevoMonitor);

      // Mostramos un alert con los datos añadidos
      alert(`Monitor editado:\n\nNombre: ${nuevoMonitor.nombre}\nEmail: ${nuevoMonitor.email}\nTeléfono: ${nuevoMonitor.telefono}`);

      //this.formulario.reset();
      this.dialogRef.close(true);
    }
  }

  onCancelar(): void {
    this.formulario.reset(); // Resetea el formulario al pulsar cancelar
    alert('Formulario cancelado');
    this.dialogRef.close(true);

    
  }

}
