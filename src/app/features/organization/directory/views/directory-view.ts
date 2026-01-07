
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentLayoutView } from '../../../../shared/components/layout/content-layout-view/content-layout-view';
import { EmptyState } from '../../../../shared/components/ui/empty-state/empty-state';

// Componentes
import { EmployeeCard } from '../components/employee-card/employee-card';
import { EmployeeAssignForm } from '../components/employee-assign-form/employee-assign-form';

// Servicios
import { EmployeesService } from '@core/services/employees.service';
import { OrganizationService } from '../../../../core/services/organization.service';
import { ToastService } from '@core/services/toast.service'; // Usamos nuestro Toast Aesthetic



// 👇 2. IMPORTAR TU NUEVO MODAL LEGO
import { LaborAssignmentModal } from '../components/labor-assignment-modal/labor-assignment-modal';


import { LaborService } from '../../../../core/services/labor.service'; // 👈 1. IMPORTAR

@Component({
  selector: 'app-directory-view',
  imports: [CommonModule, EmptyState,EmployeeCard, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, ContentLayoutView],
  templateUrl: './directory-view.html',
  styleUrl: './directory-view.scss',
})
export class DirectoryView implements OnInit {
  private employeesService = inject(EmployeesService);
  private orgService = inject(OrganizationService); // Para obtener listas de dptos/cargos
  private dialog = inject(MatDialog);
  private laborService = inject(LaborService); // 👈 2. INYECTAR
  private toast = inject(ToastService);

  employees = signal<any[]>([]);
  filteredEmployees = signal<any[]>([]);
  
  // Catálogos para el modal
  departments: any[] = [];
  positions: any[] = [];
  contracts: any[] = []; // 👈 NUEVO
  shifts: any[] = [];    // 👈 NUEVO

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Cargar Directorio
    this.employeesService.getAllEmployees().subscribe(data => {
      this.employees.set(data);
      this.filteredEmployees.set(data);
    });

    // Cargar Catálogos (Para tenerlos listos)
    this.orgService.getDepartments().subscribe(d => this.departments = d);
    this.orgService.getPositions().subscribe(p => this.positions = p);
    // 👇 3. CARGAR NUEVOS CATÁLOGOS
    this.laborService.getContracts().subscribe(c => this.contracts = c);
    this.laborService.getShifts().subscribe(s => this.shifts = s);
  }

  applyFilter(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.employees().filter(emp => 
      emp.firstName.toLowerCase().includes(term) || 
      emp.lastName.toLowerCase().includes(term) ||
      emp.position?.name.toLowerCase().includes(term)
    );
    this.filteredEmployees.set(filtered);
  }

  // 👇 LA NUEVA LÓGICA DE APERTURA
  openAssignModal(employee: any) {
    const supervisors = this.employees().filter(e => e.id !== employee.id);

    const dialogRef = this.dialog.open(EmployeeAssignForm, {
      width: '600px', // Un poco más ancho para la nueva data
      disableClose: true,
      data: {
        employee,
        departments: this.departments,
        positions: this.positions,
        supervisors: supervisors,
        // 👇 4. PASARLOS AL MODAL
        contracts: this.contracts,
        shifts: this.shifts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Usamos el método assignAdministrativeData que ya soporta todo
        this.employeesService.assignAdministrativeData(employee.id, result).subscribe({
          next: () => {
            this.toast.success('Ficha del colaborador actualizada');
            this.loadData();
          },
          error: () => this.toast.error('No se pudieron guardar los cambios')
        });
      }
    });
  }
}