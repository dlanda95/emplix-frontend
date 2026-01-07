import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface AttendanceStatus {
  status: 'NOT_STARTED' | 'WORKING' | 'COMPLETED';
  record?: {
    checkIn: string;
    checkOut?: string;
  };
}



// Interfaz para el Log de la Tabla
export interface DailyAttendanceLog {
  id: string;
  name: string;
  initials: string;
  position: string;
  department: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'PUNTUAL' | 'TARDE' | 'AUSENTE';
}

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/attendance`;

  getTodayStatus(): Observable<AttendanceStatus> {
    return this.http.get<AttendanceStatus>(`${this.apiUrl}/today`);
  }

  clockIn(): Observable<any> {
    return this.http.post(`${this.apiUrl}/clock-in`, {});
  }

  clockOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/clock-out`, {});
  }



  //esto podria ir aparte, considerar ordenarlo
// NUEVO: Obtener reporte para la tabla de admin
  getDailyReport(date?: Date): Observable<DailyAttendanceLog[]> {
    const dateStr = date ? date.toISOString() : new Date().toISOString();
    return this.http.get<DailyAttendanceLog[]>(`${this.apiUrl}/report`, {
      params: { date: dateStr }
    });
  }



  // ... imports y métodos existentes

  getMyHistory(month: number, year: number): Observable<any[]> {
    // Construir fechas inicio/fin de mes
    const startDate = new Date(year, month, 1).toISOString();
    const endDate = new Date(year, month + 1, 0).toISOString();

    return this.http.get<any[]>(`${this.apiUrl}/my-attendance`, {
      params: { from: startDate, to: endDate }
    });
  }

  
}