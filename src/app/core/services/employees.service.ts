import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Employee, TeamContext } from '../models/employee.model'; // Asegúrate de tener estos modelos

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/employees`;

  // ==========================================
  // 1. LECTURA (GET)
  // ==========================================

  // Listado completo (Directory)
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }

  // Perfil específico
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // Mi Perfil
  getMyProfile(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/me`);
  }

  // Mi Equipo
  getMyTeamContext(): Observable<TeamContext> {
    return this.http.get<TeamContext>(`${this.apiUrl}/my-team`);
  }

  // Buscador
  searchEmployees(query: string): Observable<Employee[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Employee[]>(`${this.apiUrl}/search`, { params });
  }

  // ==========================================
  // 2. ESCRITURA (POST / PATCH)
  // ==========================================

  // Crear Empleado
  createEmployee(data: any): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, data);
  }

  // 🔥 GESTIÓN ADMINISTRATIVA (El método potente)
  // Reemplaza al antiguo "assignData"
  assignAdministrativeData(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/administrative`, data);
  }

  // ==========================================
  // 3. ARCHIVOS
  // ==========================================

  uploadAvatar(employeeId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`${this.apiUrl}/${employeeId}/avatar`, formData);
  }

  uploadDocument(employeeId: string, file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post(`${this.apiUrl}/${employeeId}/documents`, formData);
  }

  getDocumentUrl(documentId: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/documents/${documentId}/url`);
  }
}