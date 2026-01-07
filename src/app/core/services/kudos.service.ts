import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// 👇 Imports Limpios (Asegúrate de tener EmployeeKudoStats en el modelo)
import { environment } from '@env/environment';
import { Kudo, CreateKudoDTO, EmployeeKudoStats } from '@core/models/kudos.model';
import { APPLAUSE_CONFIG } from '../../features/portal/kudos/kudos.config';

@Injectable({ providedIn: 'root' })
export class KudosService {
  private http = inject(HttpClient);
  
  // Endpoints Base
  private apiUrl = `${environment.apiUrl}/kudos`;
  private employeesUrl = `${environment.apiUrl}/employees`;

  // 1. CONFIGURACIÓN (Colores, iconos)
  getCategories() { return APPLAUSE_CONFIG; }

  // 2. PORTAL: Muro General
  getAllKudos(): Observable<Kudo[]> {
    return this.http.get<Kudo[]>(this.apiUrl);
  }

  // 3. PORTAL: Enviar Kudo
  sendKudo(payload: CreateKudoDTO): Observable<Kudo> {
    return this.http.post<Kudo>(this.apiUrl, payload);
  }

  // 4. PORTAL: Buscador de Empleados (Para el modal)
  searchEmployees(term: string): Observable<any[]> {
    if (!term || term.length < 2) return of([]);
    return this.http.get<any[]>(`${this.employeesUrl}/search?q=${term}`);
  }

  // 5. ADMIN: Analytics y Reportes (🚨 ESTE ERA EL QUE FALTABA)
  getHrAnalytics(): Observable<EmployeeKudoStats[]> {
    return this.http.get<EmployeeKudoStats[]>(`${this.apiUrl}/analytics`);
  }
}