import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface WorkShift {
  id: string;
  name: string;
  isFiscalized: boolean; // ¿Marca asistencia?
  startTime?: string;    // "09:00"
  endTime?: string;      // "18:00"
  breakTime: number;     // Minutos
  tolerance: number;     // Minutos
  allowsOvertime: boolean;
  _count?: { employees: number };
}




export interface ContractType {
  id: string;
  name: string;        // Ej: "Indeterminado"
  code?: string;       // Ej: "IND"
  hasBenefits: boolean; // ¿Recibe CTS/Grati?
  isLaboral: boolean;   // ¿Planilla electrónica?
  _count?: { employees: number };
}

@Injectable({ providedIn: 'root' })
export class LaborService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/labor`;

  // --- WORK SHIFTS ---
  getShifts(): Observable<WorkShift[]> {
    return this.http.get<WorkShift[]>(`${this.apiUrl}/shifts`);
  }

  createShift(data: Partial<WorkShift>): Observable<WorkShift> {
    return this.http.post<WorkShift>(`${this.apiUrl}/shifts`, data);
  }

  updateShift(id: string, data: Partial<WorkShift>): Observable<WorkShift> {
    return this.http.put<WorkShift>(`${this.apiUrl}/shifts/${id}`, data);
  }

  deleteShift(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/shifts/${id}`);
  }





  // ==========================================
  // 2. CONTRATOS (CONTRACT TYPES) - ¡NUEVO!
  // ==========================================
  getContracts(): Observable<ContractType[]> {
    return this.http.get<ContractType[]>(`${this.apiUrl}/contracts`);
  }

  createContract(data: Partial<ContractType>): Observable<ContractType> {
    return this.http.post<ContractType>(`${this.apiUrl}/contracts`, data);
  }

  updateContract(id: string, data: Partial<ContractType>): Observable<ContractType> {
    return this.http.put<ContractType>(`${this.apiUrl}/contracts/${id}`, data);
  }

  deleteContract(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contracts/${id}`);
  }
}



