import { Component, inject, OnInit } from '@angular/core';
import { MedicoService } from '../../shared/services/medico.service';
import { Medico } from '../../shared/models/medico.model';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css',
})
export default class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  medicoService = inject(MedicoService);

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data) => {
        this.medicos = data.map((medico) => ({
          ...medico,
          fecha_registro: new Date(medico.fecha_registro)
            .toISOString()
            .split('T')[0],
        }));
      },
      error: (error) => console.error('Error al cargar los medicos: ', error),
    });
  }

  eliminarMedico(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este medico?')) {
      this.medicoService.deleteMedico(id).subscribe({
        next: () => {
          alert('Medico eliminado');
          this.cargarMedicos(); // Recarga la lista
        },
        error: (err) => console.error('Error al eliminar el medico', err),
      });
    }
  }
}
