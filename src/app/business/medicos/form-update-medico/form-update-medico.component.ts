import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Medico } from '../../../shared/models/medico.model';
import { MedicoService } from '../../../shared/services/medico.service';
import { EspecialidadService } from '../../../shared/services/especialidad.service';

@Component({
  selector: 'app-form-update-medico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-update-medico.component.html',
  styleUrl: './form-update-medico.component.css',
})
export default class FormUpdateMedicoComponent implements OnInit {
  medicoForm: FormGroup;
  medicoId!: number; // Se recibirá desde la ruta
  especialidades: any[] = []; //lista de especialidades

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private especialidadesService: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.medicoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidad: [{ value: '', disabled: true }, Validators.required], // Inicialmente deshabilitado
      fecha_registro: [{ value: '', disabled: true }, Validators.required], // Inicialmente deshabilitado
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.medicoId = +params['id']; // Convierte el parámetro ID en número
    });

    // Cargar la lista de especialidades
    this.cargarEspecialidades();
  }

  cargarMedico(): void {
    this.medicoService.getMedico(this.medicoId).subscribe((medico: Medico) => {
      // Buscar la especialidad por ID
      const especialidad = this.especialidades.find(
        (e) => e.id_especialidad === medico.id_especialidad
      );

      this.medicoForm.patchValue({
        ...medico,
        especialidad: especialidad
          ? especialidad.nombre_especialidad
          : 'No definida', // Mostrar el nombre de la especialidad
        fecha_registro: new Date(medico.fecha_registro)
          .toISOString()
          .split('T')[0], // Formatear fecha
      }); // Llena el formulario con los datos del paciente
    });
  }

  cargarEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe((data: any[]) => {
      this.especialidades = data;
      this.cargarMedico(); // Llamar después de cargar especialidades
    });
  }

  actualizarMedico(): void {
    if (this.medicoForm.valid) {
      this.medicoService
        .updateMedico(this.medicoId, this.medicoForm.value)
        .subscribe({
          next: () => {
            alert('Medico actualizado correctamente');
            this.router.navigate(['/home/medicos']);
          },
          error: (err) => console.error('Error al actualizar el medico', err),
        });
    }
  }
}
