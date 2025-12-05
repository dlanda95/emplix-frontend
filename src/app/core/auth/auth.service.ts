import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';

export interface LoginResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<any>(this.getUserFromStorage());

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials).pipe(
      tap(response => {
        this.saveSession(response);
        this.router.navigate(['/home']);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.auth.register, data);
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post<{ exists: boolean }>(API_ENDPOINTS.auth.checkEmail, { email })
      .pipe(map(response => response.exists));
  }

  // LIMPIO: El interceptor inyecta el token automáticamente
  getProfile(): Observable<any> {
    return this.http.get(API_ENDPOINTS.auth.me);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private saveSession(response: LoginResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
  }

  private getUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}