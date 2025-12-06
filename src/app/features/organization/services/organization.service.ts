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



// --- NUEVA INTERFAZ PARA CARGOS ---
export interface Position {
  id: string;
  name: string;
  description?: string;
  departmentId?: string; // <--- NUEVO
  department?: { name: string }; // <--- Para mostrar el nombre en la tabl
  _count?: { employees: number };
}


export interface CreateEntityDto {
  name: string;
  description?: string;
  departmentId?: string;
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



  // --- CARGOS (NUEVOS MÉTODOS) ---
  // Actualizamos para aceptar filtro
  getPositions(departmentId?: string): Observable<Position[]> {
    let url = `${this.apiUrl}/positions`;
    if (departmentId) {
      url += `?departmentId=${departmentId}`;
    }
    return this.http.get<Position[]>(url);
  }

  createPosition(data: CreateEntityDto): Observable<Position> {
    return this.http.post<Position>(`${this.apiUrl}/positions`, data);
  }

  updatePosition(id: string, data: CreateEntityDto): Observable<Position> {
    return this.http.put<Position>(`${this.apiUrl}/positions/${id}`, data);
  }

  deletePosition(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/positions/${id}`);
  }

}