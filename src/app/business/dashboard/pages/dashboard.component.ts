import { Component } from '@angular/core';
import { FormConsultaComponent } from '../components/form-consulta/form-consulta.component';
import { FormPacienteComponent } from '../components/form-paciente/form-paciente.component';
import { FormMedicoComponent } from '../components/form-medico/form-medico.component';
import { CommonModule } from '@angular/common';
import { FormEspecialidadComponent } from '../components/form-especialidad/form-especialidad.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormConsultaComponent,
    FormPacienteComponent,
    FormMedicoComponent,
    FormEspecialidadComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {
  activeForm: string | null = null;

  showForm(form: string): void {
    this.activeForm = form;
  }

  hideForm(): void {
    this.activeForm = null;
  }
}
