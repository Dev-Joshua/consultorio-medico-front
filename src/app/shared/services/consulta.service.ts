import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ConsultaMedica } from '../models/consulta.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getConsultas(): Observable<ConsultaMedica[]> {
    return this.http.get<ConsultaMedica[]>(`${this.apiUrl}/consultas`);
  }

  getConsulta(id: number): Observable<ConsultaMedica> {
    return this.http.get<ConsultaMedica>(`${this.apiUrl}/consultas/${id}`);
  }

  createConsulta(consulta: ConsultaMedica): Observable<ConsultaMedica> {
    return this.http.post<ConsultaMedica>(`${this.apiUrl}/consultas`, consulta);
  }

  updateConsulta(
    id: number,
    consulta: ConsultaMedica
  ): Observable<ConsultaMedica> {
    return this.http.put<ConsultaMedica>(
      `${this.apiUrl}/consultas/${id}`,
      consulta
    );
  }

  deleteConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/consultas/${id}`);
  }
}
