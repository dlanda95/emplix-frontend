import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

// 👇 1. Usamos el servicio del Core (Arquitectura Limpia)
import { EmployeesService } from '@core/services/employees.service';
import { UserAvatar } from '../ui/user-avatar/user-avatar';

@Component({
  selector: 'app-user-search-input',
  imports: [CommonModule, MatIconModule, UserAvatar],
  templateUrl: './user-search-input.html',
  styleUrl: './user-search-input.scss',
})
export class UserSearchInput {
  
  
 private employeeService = inject(EmployeesService); // Idealmente usarías un EmployeeService genérico

  // INPUTS: Para personalizar el texto desde fuera
  @Input() label: string = 'Buscar usuario';
  @Input() placeholder: string = 'Escribeee un nombre...';
  
  // OUTPUT: Avisa al padre cuando se seleccionó a alguien
 @Output() selected = new EventEmitter<any>();

  // ESTADO INTERNO
  searchTerm = signal('');
  searchResults = signal<any[]>([]);
  showResults = signal(false);
  showDropdown = signal(false);
  selectedUser = signal<any>(null);
  isLoading = signal(false);

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term.trim() || term.length < 2) {
          return of([]);
        }
        this.isLoading.set(true);
        // Usamos el servicio real de empleados
        return this.employeeService.searchEmployees(term);
      })
    ).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.isLoading.set(false);
        this.showDropdown.set(true); // Mostrar dropdown si hay data
      },
      error: () => this.isLoading.set(false)
    });
  }

 // Al escribir
  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
    
    if (term.length > 1) {
      this.searchSubject.next(term);
    } else {
      this.showDropdown.set(false);
    }
  }



  // Al hacer foco en el input
  onFocus() {
    if (this.searchTerm().length > 1 && this.searchResults().length > 0) {
      this.showDropdown.set(true);
    }
  }


  // Al seleccionar un usuario de la lista
  selectUser(user: any) {
    // 1. Actualizamos UI Local (Cápsula Azul)
    this.selectedUser.set(user);
    this.showDropdown.set(false);
    this.searchTerm.set('');

    // 2. Avisamos al Padre
    this.selected.emit(user);
  }

  // Al hacer clic en la X de la cápsula
  clearSelection() {
    this.selectedUser.set(null);
    this.selected.emit(null);
    
    // Opcional: enfocar el input automáticamente si quieres
  }
  // Cerrar dropdown al hacer clic fuera (Backdrop)
  closeDropdown() {
    this.showDropdown.set(false);
  }
}