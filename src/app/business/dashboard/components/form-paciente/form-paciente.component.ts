import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-paciente',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css',
})
export class FormPacienteComponent {}
