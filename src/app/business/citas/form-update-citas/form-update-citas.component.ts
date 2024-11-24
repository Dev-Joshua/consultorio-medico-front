import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../../shared/services/consulta.service';
import { PacienteService } from '../../../shared/services/paciente.service';
import { MedicoService } from '../../../shared/services/medico.service';
import { Medico } from '../../../shared/models/medico.model';
import { ConsultaMedica, Estado } from '../../../shared/models/consulta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-update-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-update-citas.component.html',
  styleUrl: './form-update-citas.component.css',
})
export default class FormUpdateCitasComponent {
  consultaForm: FormGroup;
  consultaId!: number;
  medicos: Medico[] = [];
  estados: string[] = [];

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.consultaForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_medico: ['', Validators.required],
      motivo_consulta: ['', Validators.required],
      tratamiento: [''],
      estado: ['', Validators.required],
      fecha_cita: ['', Validators.required],
      hora_cita: ['', Validators.required],
    });

    // Convierte los valores del enum Estado a un array de strings
    this.estados = Object.keys(Estado).filter((key) => isNaN(Number(key))); // Solo obtiene los nombres del enum
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.consultaId = +params['id']; // Convierte el parámetro ID en número
      this.cargarMedicos();
    });
  }

  cargarConsulta(): void {
    this.consultaService.getConsulta(this.consultaId).subscribe(
      (consulta: ConsultaMedica) => {
        // Rellena los valores en el formulario
        this.consultaForm.patchValue({
          id_paciente: consulta.id_paciente,
          id_medico: consulta.id_medico,
          motivo_consulta: consulta.motivo_consulta,
          tratamiento: consulta.tratamiento,
          estado: consulta.estado,
          fecha_cita: consulta.fecha_cita,
          hora_cita: consulta.hora_cita,
        });
      },
      (error) => {
        console.error('Error al cargar la consulta médica', error);
      }
    );
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe((data: any[]) => {
      this.medicos = data;
      this.cargarConsulta();
    });
  }

  actualizarConsulta(): void {
    if (this.consultaForm.valid) {
      this.consultaService
        .updateConsulta(this.consultaId, this.consultaForm.value)
        .subscribe({
          next: () => {
            alert('Consulta actualizado correctamente');
            this.router.navigate(['/home/citas']);
          },
          error: (err) => console.error('Error al actualizar la consulta', err),
        });
    }
  }
}
