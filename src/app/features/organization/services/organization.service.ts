import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'; // Asegúrate de tener este archivo
import { Observable } from 'rxjs';

// Definimos las interfaces aquí para mantener el tipado fuerte
export interface Department {
  id: string;
  name: string;
  description?: string;
  _count?: {
    employees: number;
  };
  createdAt?: string;
}

export interface CreateDepartmentDto {
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/org`; // Ajusta según tu environment, ej: http://localhost:3000/api/org

  // --- DEPARTAMENTOS ---
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }

  createDepartment(data: CreateDepartmentDto): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/departments`, data);
  }

  updateDepartment(id: string, data: CreateDepartmentDto): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/departments/${id}`, data);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departments/${id}`);
  }

  // Aquí irían los métodos de POSITIONS (Cargos) más adelante...
}