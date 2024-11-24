import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/medicos`);
  }

  getMedico(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/medicos/${id}`);
  }

  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos`, medico);
  }

  updateMedico(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/medicos/${id}`, medico);
  }

  deleteMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicos/${id}`);
  }
}
