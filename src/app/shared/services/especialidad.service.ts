import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../models/especialidad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl}/especialidades`);
  }

  getEspecialidad(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.apiUrl}/especialidades/${id}`);
  }

  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(
      `${this.apiUrl}/especialidades`,
      especialidad
    );
  }

  updateEspecialidad(
    id: number,
    especialidad: Especialidad
  ): Observable<Especialidad> {
    return this.http.put<Especialidad>(
      `${this.apiUrl}/especialidades/${id}`,
      especialidad
    );
  }

  deleteEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/especialidades/${id}`);
  }
}
