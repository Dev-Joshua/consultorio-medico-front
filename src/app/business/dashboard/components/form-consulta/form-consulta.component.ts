import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Paciente } from '../../../../shared/models/paciente.model';
import { ConsultaService } from '../../../../shared/services/consulta.service';
import { Medico } from '../../../../shared/models/medico.model';
import { PacienteService } from '../../../../shared/services/paciente.service';
import { MedicoService } from '../../../../shared/services/medico.service';
import {
  ConsultaMedica,
  Estado,
} from '../../../../shared/models/consulta.model';
import { HistorialService } from '../../../../shared/services/historial.service';

@Component({
  selector: 'app-form-consulta',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './form-consulta.component.html',
  styleUrl: './form-consulta.component.css',
})
export class FormConsultaComponent {
  consultaForm: FormGroup;
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  estados: string[] = [];

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private historialService: HistorialService,
    private router: Router
  ) {
    // Inicializar el formulario reactivo
    this.consultaForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_medico: ['', Validators.required],
      motivo_consulta: ['', Validators.required],
      tratamiento: ['', Validators.required],
      estado: ['', Validators.required],
      fecha_cita: ['', Validators.required],
      hora_cita: ['', Validators.required],
    });
    // Convierte los valores del enum Estado a un array de strings
    this.estados = Object.keys(Estado).filter((key) => isNaN(Number(key))); // Solo obtiene los nombres del enum
  }

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarMedicos();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        alert('Error al cargar los pacientes');
      },
    });
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data) => {
        this.medicos = data;
      },
      error: (err) => {
        console.error('Error al cargar medicos:', err);
        alert('Error al cargar los medicos');
      },
    });
  }

  registrarConsulta(): void {
    if (this.consultaForm.invalid) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    const consultaData = this.consultaForm.value;

    this.consultaService.createConsulta(consultaData).subscribe({
      next: (consulta) => {
        console.log('Consulta registrada:', consulta);
        alert('Consulta registrada exitosamente.');

        // Crear historial médico automáticamente
        const historialData = {
          id_consulta: consulta.id_consulta,
          id_paciente: consulta.id_paciente,
          fecha_consulta: `${consulta.fecha_cita} ${consulta.hora_cita}`,
          tratamiento: consulta.tratamiento,
        };

        this.historialService.createHistorial(historialData).subscribe({
          next: (historial) => {
            console.log('Historial médico creado:', historial);
            alert('Consulta y historial registrados exitosamente.');
            this.router.navigate(['/home/citas']); // Redirigir a la lista de citas
          },
          error: (err) => {
            console.error('Error al crear el historial médico:', err);
            alert(
              'Consulta registrada, pero hubo un error al crear el historial médico.'
            );
          },
        });
      },
      error: (err) => {
        console.error('Error al registrar la consulta:', err);
        alert('Ocurrió un error al registrar la consulta.');
      },
    });
  }
}
