import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PacienteService } from '../../../shared/services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../shared/models/paciente.model';

@Component({
  selector: 'app-form-update-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-update-paciente.component.html',
  styleUrl: './form-update-paciente.component.css',
})
export default class FormUpdatePacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  pacienteId!: number; // Se recibirá desde la ruta

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pacienteForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pacienteId = +params['id']; // Convierte el parámetro ID en número
      this.cargarPaciente();
    });
  }

  cargarPaciente(): void {
    this.pacienteService
      .getPaciente(this.pacienteId)
      .subscribe((paciente: Paciente) => {
        this.pacienteForm.patchValue(paciente); // Llena el formulario con los datos del paciente
      });
  }

  actualizarPaciente(): void {
    if (this.pacienteForm.valid) {
      this.pacienteService
        .updatePaciente(this.pacienteId, this.pacienteForm.value)
        .subscribe({
          next: () => {
            alert('Paciente actualizado correctamente');
            this.router.navigate(['/home/pacientes']);
          },
          error: (err) => console.error('Error al actualizar el paciente', err),
        });
    }
  }
}
