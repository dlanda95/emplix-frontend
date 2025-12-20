import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable , of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/employees`;

  getDirectory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  assignData(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/assign`, data);
  }


  getMyTeam(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/my-team`);
  }


searchEmployees(term: string): Observable<any[]> {
    if (!term.trim()) return of([]);
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${term}`);
  }

}
