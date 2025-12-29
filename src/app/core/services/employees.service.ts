import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
  uploadAvatar(employeeId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file); // 'avatar' debe coincidir con el backend

    return this.http.post(`${this.apiUrl}/${employeeId}/avatar`, formData);
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
  getMyProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
}