import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HistorialMedico } from '../models/historial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHistoriales(): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(`${this.apiUrl}/historial`);
  }

  getHistrial(id: number): Observable<HistorialMedico> {
    return this.http.get<HistorialMedico>(`${this.apiUrl}/historial/${id}`);
  }

  createHistorial(historial: HistorialMedico): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(
      `${this.apiUrl}/historial`,
      historial
    );
  }

  updateHistorial(
    id: number,
    historial: HistorialMedico
  ): Observable<HistorialMedico> {
    return this.http.put<HistorialMedico>(
      `${this.apiUrl}/historial/${id}`,
      historial
    );
  }

  deleteHistorial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/historial/${id}`);
  }
}
