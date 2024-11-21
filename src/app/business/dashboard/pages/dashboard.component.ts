import { Component } from '@angular/core';
import { FormConsultaComponent } from '../components/form-consulta/form-consulta.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormConsultaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {}
