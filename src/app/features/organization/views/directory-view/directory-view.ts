
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Componentes
import { EmployeeCard } from '../../components/employee-card/employee-card';
import { EmployeeAssignForm } from '../../components/employee-assign-form/employee-assign-form';

// Servicios
import { EmployeesService } from '../../services/employee.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-directory-view',
  imports: [CommonModule, EmployeeCard, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './directory-view.html',
  styleUrl: './directory-view.scss',
})
export class DirectoryView implements OnInit {
  private employeesService = inject(EmployeesService);
  private orgService = inject(OrganizationService); // Para obtener listas de dptos/cargos
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  employees = signal<any[]>([]);
  filteredEmployees = signal<any[]>([]);
  
  // Catálogos para el modal
  departments: any[] = [];
  positions: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Cargar Directorio
    this.employeesService.getDirectory().subscribe(data => {
      this.employees.set(data);
      this.filteredEmployees.set(data);
    });

    // Cargar Catálogos (Para tenerlos listos)
    this.orgService.getDepartments().subscribe(d => this.departments = d);
    this.orgService.getPositions().subscribe(p => this.positions = p);
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

  openAssignModal(employee: any) {
    // Filtramos la lista de supervisores para que NO incluya al mismo empleado
    const potentialSupervisors = this.employees().filter(e => e.id !== employee.id);

    const dialogRef = this.dialog.open(EmployeeAssignForm, {
      width: '500px',
      data: {
        employee,
        departments: this.departments,
        positions: this.positions,
        supervisors: potentialSupervisors
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.assignData(employee.id, result).subscribe({
          next: () => {
            this.snackBar.open('Datos actualizados correctamente', 'Ok', { duration: 3000 });
            this.loadData(); // Recargar para ver cambios
          },
          error: () => this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }
}