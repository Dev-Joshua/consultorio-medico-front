import { Component, inject } from '@angular/core';
import { HistorialMedico } from '../../shared/models/historial.model';
import { HistorialService } from '../../shared/services/historial.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
})
export default class HistorialComponent {
  historiales: HistorialMedico[] = [];

  historialService = inject(HistorialService);

  ngOnInit(): void {
    this.cargarHistoriales();
  }

  cargarHistoriales(): void {
    this.historialService.getHistoriales().subscribe({
      next: (data) => (this.historiales = data),
      error: (error) =>
        console.error('Error al cargar historias medicas: ', error),
    });
  }

  eliminarHistorial(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este historial?')) {
      this.historialService.deleteHistorial(id).subscribe({
        next: () => {
          alert('Historial eliminado');
          this.cargarHistoriales(); // Recarga la lista
        },
        error: (err) => console.error('Error al eliminar el historial', err),
      });
    }
  }
}
