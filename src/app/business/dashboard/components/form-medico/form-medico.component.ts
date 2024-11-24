import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MedicoService } from '../../../../shared/services/medico.service';
import { CommonModule } from '@angular/common';
import { Especialidad } from '../../../../shared/models/especialidad.model';
import { EspecialidadService } from '../../../../shared/services/especialidad.service';

@Component({
  selector: 'app-form-medico',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-medico.component.html',
  styleUrl: './form-medico.component.css',
})
export class FormMedicoComponent {
  medicoForm: FormGroup;
  especialidades: Especialidad[] = []; //Almacenar las especialidades en un array

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private router: Router
  ) {
    // Inicializar el formulario reactivo
    this.medicoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarEspecialidades(); // Cargar especialidades al iniciar el componente
  }

  // Método para cargar especialidades
  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
        alert('Error al cargar las especialidades');
      },
    });
  }

  // Método para registrar un Medico
  registrarMedico(): void {
    if (this.medicoForm.invalid) {
      // Mostrar errores si el formulario no es válido
      this.medicoForm.markAllAsTouched();
      return;
    }

    // Obtener datos del formulario
    const medico = this.medicoForm.value;

    // Llamar al servicio para registrar al Medico
    this.medicoService.createMedico(medico).subscribe({
      next: (response) => {
        console.log('Medico registrado:', response);
        alert('Medico registrado exitosamente');
        this.router.navigate(['/home/medicos']); // Redirigir a una página de listado (ajusta según tu app)
      },
      error: (error) => {
        console.error('Error al registrar medico:', error);
        alert('Ocurrió un error al registrar el medico');
      },
    });
  }
}
