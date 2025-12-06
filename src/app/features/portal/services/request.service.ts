import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface RequestPayload {
  type: 'VACATION' | 'PERMIT' | 'SICK_LEAVE' | 'HOME_OFFICE' | 'PROFILE_UPDATE';
  reason?: string;
  startDate?: string;
  endDate?: string;
  data?: any; // JSON con los cambios de perfil
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/requests`;

  createRequest(payload: RequestPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  getMyRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me`);
  }
}