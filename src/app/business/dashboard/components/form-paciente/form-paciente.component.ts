import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PacienteService } from '../../../../shared/services/paciente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-paciente',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css',
})
export class FormPacienteComponent {
  pacienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router
  ) {
    // Inicializar el formulario reactivo
    this.pacienteForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  // Método para registrar un paciente
  registrarPaciente(): void {
    if (this.pacienteForm.invalid) {
      // Mostrar errores si el formulario no es válido
      this.pacienteForm.markAllAsTouched();
      return;
    }

    // Obtener datos del formulario
    const paciente = this.pacienteForm.value;

    // Llamar al servicio para registrar al paciente
    this.pacienteService.createPaciente(paciente).subscribe({
      next: (response) => {
        console.log('Paciente registrado:', response);
        alert('Paciente registrado exitosamente');
        this.router.navigate(['/home/pacientes']); // Redirigir a una página de listado (ajusta según tu app)
      },
      error: (error) => {
        console.error('Error al registrar paciente:', error);
        alert('Ocurrió un error al registrar el paciente');
      },
    });
  }
}
