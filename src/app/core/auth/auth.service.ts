import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, Observable,map } from 'rxjs';

// Importamos la configuración centralizada de rutas (Mejor Práctica)
import { API_ENDPOINTS } from '../config/api.config';
// Si no creaste api.config.ts, usa esto en su lugar:
// import { environment } from '../../../environments/environment';

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
}


// Interfaz para los datos de registro
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Si usas api.config.ts:
  private readonly loginUrl = API_ENDPOINTS.auth.login;
  // Si usas environment directo:
  // private readonly loginUrl = `${environment.apiUrl}/auth/login`;


  private readonly registerUrl = API_ENDPOINTS.auth.register;


  // Signal para manejar el estado del usuario (Reactivo y moderno)
  // Inicializamos leyendo del localStorage por si el usuario recarga la página
  currentUser = signal<any>(this.getUserFromStorage());

  // --- MÉTODO CLAVE PARA EL GUARDIA ---
  // Retorna true si existe un token, false si no.
  // Aquí podríamos agregar validación de expiración del JWT en el futuro.
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Convierte string a boolean (true si existe, false si es null/vacío)
  }

  // --- LOGIN ---
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      tap(response => {
        // 1. Persistencia (Para que no se pierda al recargar)
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // 2. Estado Reactivo (Para que la UI se entere del cambio)
        this.currentUser.set(response.user);
        
        console.log('✅ Login exitoso:', response.user.role);
        
        // 3. Redirección automática al Dashboard
        this.router.navigate(['/home']);
      })
    );
  }




 checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post<{ exists: boolean }>(API_ENDPOINTS.auth.checkEmail, { email })
      .pipe(map(response => response.exists));
  }



// --- NUEVO MÉTODO DE REGISTRO ---
  register(data: RegisterData): Observable<any> {
    return this.http.post(this.registerUrl, data).pipe(
      tap(() => {
        // Opcional: Podrías hacer login automático aquí si el backend devolviera el token
        // Por ahora, redirigimos al login o mostramos éxito
      })
    );
  }




  // --- LOGOUT ---
  logout() {
    // Limpiamos todo
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    
    // Mandamos al usuario a la puerta
    this.router.navigate(['/login']);
  }
  
  // Helper para obtener el token (Útil para Interceptors)
  getToken() {
    return localStorage.getItem('token');
  }

  // Helper privado para inicializar el estado
  private getUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }





   getProfile(): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    return this.http.get(API_ENDPOINTS.auth.me, { headers });
  }



}