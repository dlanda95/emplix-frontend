import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { KudosService } from '../../../features/portal/kudos/services/kudos.service'; // O tu EmployeeService si lo moviste
// 1. CAMBIO DE IMPORT: Usamos el servicio genérico
import { EmployeesService } from '../../../features/organization/directory/services/employee.service';


@Component({
  selector: 'app-user-search-input',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './user-search-input.html',
  styleUrl: './user-search-input.scss',
})
export class UserSearchInput {
  
  
 private employeeService = inject(EmployeesService); // Idealmente usarías un EmployeeService genérico

  // INPUTS: Para personalizar el texto desde fuera
  @Input() label: string = 'Buscar usuario';
  @Input() placeholder: string = 'Escribe un nombre...';
  
  // OUTPUT: Avisa al padre cuando se seleccionó a alguien
  @Output() selectionChange = new EventEmitter<any>();

  // ESTADO INTERNO
  searchTerm = signal('');
  searchResults = signal<any[]>([]);
  showResults = signal(false);
  selectedUser = signal<any>(null);
  isLoading = signal(false);

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term.trim()) return of([]);
        this.isLoading.set(true);
        return this.employeeService.searchEmployees(term);
      })
    ).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.showResults.set(true);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onSearchInput(event: any) {
    const term = event.target.value;
    this.searchTerm.set(term);
    
    if (term.length > 1) {
      this.searchSubject.next(term);
    } else {
      this.searchResults.set([]);
      this.showResults.set(false);
    }
  }

  selectUser(user: any) {
    this.selectedUser.set(user);
    this.showResults.set(false);
    this.searchTerm.set(''); 
    
    // Emitimos el evento al componente padre
    this.selectionChange.emit(user);
  }

  clearSelection() {
    this.selectedUser.set(null);
    this.selectionChange.emit(null); // Avisamos que se borró
  }
}