import { Component } from '@angular/core';
import { FormConsultaComponent } from '../components/form-consulta/form-consulta.component';
import { FormPacienteComponent } from '../components/form-paciente/form-paciente.component';
import { FormMedicoComponent } from '../components/form-medico/form-medico.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormConsultaComponent, FormPacienteComponent, FormMedicoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {}
