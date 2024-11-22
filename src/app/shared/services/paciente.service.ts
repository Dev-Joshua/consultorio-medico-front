import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`);
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/pacientes/${id}`);
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/pacientes`, paciente);
  }

  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/pacientes/${id}`, paciente);
  }

  deletePaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pacientes/${id}`);
  }
}
