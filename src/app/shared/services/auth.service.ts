import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authToken = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  login(credentials: {
    nombre_usuario: string;
    contrasena: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(user: {
    nombre_usuario: string;
    contrasena: string;
    rol: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.authToken.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authToken.next(null);
  }

  getAuthToken(): BehaviorSubject<string | null> {
    return this.authToken;
  }
}
