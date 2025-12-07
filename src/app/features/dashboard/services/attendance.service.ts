import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface AttendanceStatus {
  status: 'NOT_STARTED' | 'WORKING' | 'COMPLETED';
  record?: {
    checkIn: string;
    checkOut?: string;
  };
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
}