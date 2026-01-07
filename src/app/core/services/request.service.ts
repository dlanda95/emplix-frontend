import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RequestPayload, RequestResponse, VacationBalance } from '@core/models/request.model';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/requests`;

  createRequest(payload: RequestPayload): Observable<any> {
    return this.http.post<RequestResponse>(this.apiUrl, payload);
  }

  getMyRequests(): Observable<any[]> {
    return this.http.get<RequestResponse[]>(`${this.apiUrl}/me`);
  }


// --- ADMIN METHODS ---
  getPendingRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  processRequest(id: string, status: 'APPROVED' | 'REJECTED'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }



  getVacationBalance(): Observable<VacationBalance> {
    return this.http.get<VacationBalance>(`${this.apiUrl}/balance`);
  }
}