import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EspecialidadService } from '../../../../shared/services/especialidad.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-especialidad',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-especialidad.component.html',
  styleUrl: './form-especialidad.component.css',
})
export class FormEspecialidadComponent {
  especialidadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService,
    private router: Router
  ) {
    // Inicializar el formulario reactivo
    this.especialidadForm = this.fb.group({
      nombre_especialidad: ['', Validators.required],
    });
  }

  // Método para registrar una Especialidad
  registrarEspecialidad(): void {
    if (this.especialidadForm.invalid) {
      // Mostrar errores si el formulario no es válido
      this.especialidadForm.markAllAsTouched();
      return;
    }

    // Obtener datos del formulario
    const especialidad = this.especialidadForm.value;

    // Llamar al servicio para registrar al especialidad
    this.especialidadService.createEspecialidad(especialidad).subscribe({
      next: (response) => {
        console.log('Especialidad registrada:', response);
        alert('Especialidad registrada exitosamente');
        this.router.navigate(['/home/especialidades']); // Redirigir a una página de listado (ajusta según tu app)
      },
      error: (error) => {
        console.error('Error al registrar la especialidad:', error);
        alert('Ocurrió un error al registrar la especialidad');
      },
    });
  }
}
