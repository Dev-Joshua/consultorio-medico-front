import { Component, inject } from '@angular/core';
import { ConsultaMedica } from '../../shared/models/consulta.model';
import { ConsultaService } from '../../shared/services/consulta.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export default class CitasComponent {
  consultas: ConsultaMedica[] = [];

  consultaService = inject(ConsultaService);

  ngOnInit(): void {
    this.cargarConsultas();
  }

  cargarConsultas(): void {
    this.consultaService.getConsultas().subscribe({
      next: (data) => (this.consultas = data),
      error: (error) => console.error('Error al cargar las citas: ', error),
    });
  }

  eliminarConsulta(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este consulta?')) {
      this.consultaService.deleteConsulta(id).subscribe({
        next: () => {
          alert('Consulta eliminada');
          this.cargarConsultas(); // Recarga la lista
        },
        error: (err) => console.error('Error al eliminar la consulta', err),
      });
    }
  }
}
