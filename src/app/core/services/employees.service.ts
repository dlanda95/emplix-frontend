import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// 👇 Importamos nuestros modelos nuevos
import { Employee, TeamContext } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = `${environment.apiUrl}/employees`; // Asegúrate de tener esto en tu environment

  constructor(private http: HttpClient) {}

  // 1. Obtener Empleado (Incluye photoUrl)
  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 2. Subir Avatar (POST con FormData)
 // 5. Subir Avatar (Respuesta parcial o completa)
  uploadAvatar(employeeId: string, file: File): Observable<{ message: string, document: any, photoUrl?: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post<{ message: string, document: any, photoUrl?: string }>(
      `${this.apiUrl}/${employeeId}/avatar`, 
      formData
    );
  }

  // 3. Subir Documento Privado (POST con FormData + Type)
  uploadDocument(employeeId: string, file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);   // 'file' coincide con backend
    formData.append('type', type);   // 'CONTRACT', 'ID_CARD', etc.

    return this.http.post(`${this.apiUrl}/${employeeId}/documents`, formData);
  }

  // 4. Obtener Link Seguro (SAS Token)
  getDocumentUrl(documentId: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/documents/${documentId}/url`);
  }


  // Agrega esto si no lo tienes
 // 1. Obtener MI PERFIL (Tipado fuerte)
  getMyProfile(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/me`);
  }



  // 2. Obtener Contexto de Equipo
  getMyTeamContext(): Observable<TeamContext> {
    return this.http.get<TeamContext>(`${this.apiUrl}/my-team`);
  }




  // 3. Directorio (Array de empleados)
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }



  // 4. Buscador
  searchEmployees(query: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/search`, {
      params: { q: query }
    });
  }





  // 👇 AGREGAR ESTE MÉTODO
  assignAdministrativeData(id: string, data: any): Observable<any> {
    // Asumimos que la ruta en backend es PATCH /employees/:id/administrative
    // Si usaste otra ruta en el backend (labor.routes.ts), ajústala aquí.
    return this.http.patch(`${this.apiUrl}/${id}/administrative`, data);
  }





}