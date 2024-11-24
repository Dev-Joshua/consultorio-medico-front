import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Especialidad } from '../../shared/models/especialidad.model';
import { EspecialidadService } from '../../shared/services/especialidad.service';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css',
})
export default class EspecialidadesComponent implements OnInit {
  especialidades: Especialidad[] = [];

  especialidadService = inject(EspecialidadService);

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => (this.especialidades = data),
      error: (error) =>
        console.error('Error al cargar especialidades: ', error),
    });
  }

  eliminarEspecialidad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
      this.especialidadService.deleteEspecialidad(id).subscribe({
        next: () => {
          alert('Especialidad eliminada');
          this.cargarEspecialidades(); // Recarga la lista
        },
        error: (err) => console.error('Error al eliminar la especialidad', err),
      });
    }
  }
}
