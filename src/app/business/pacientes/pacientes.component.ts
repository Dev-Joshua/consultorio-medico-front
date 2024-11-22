import { Component, inject, OnInit } from '@angular/core';
import { Paciente } from '../../shared/models/paciente.model';
import { PacienteService } from '../../shared/services/paciente.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
})
export default class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];

  pacienteService = inject(PacienteService);

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => (this.pacientes = data),
      error: (error) => console.error('Error al cargar los pacientes: ', error),
    });
  }

  eliminarPaciente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.deletePaciente(id).subscribe({
        next: () => {
          alert('Paciente eliminado');
          this.cargarPacientes(); // Recarga la lista
        },
        error: (err) => console.error('Error al eliminar el paciente', err),
      });
    }
  }
}
