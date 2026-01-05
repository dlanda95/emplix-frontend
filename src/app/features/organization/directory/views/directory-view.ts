
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
import { EmployeesService } from '../services/employee.service';
import { OrganizationService } from '../../structure/services/organization.service';
import { ToastService } from '@core/services/toast.service'; // Usamos nuestro Toast Aesthetic



// 👇 2. IMPORTAR TU NUEVO MODAL LEGO
import { LaborAssignmentModal } from '../components/labor-assignment-modal/labor-assignment-modal';



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
  private snackBar = inject(MatSnackBar);
  private toast = inject(ToastService);

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

  // 👇 LA NUEVA LÓGICA DE APERTURA
  openAssignModal(employee: any) {
    // Abrimos el Modal "Lego"
    const dialogRef = this.dialog.open(LaborAssignmentModal, {
      width: '650px', // Un poco más ancho para que quepan las columnas
      disableClose: true,
      data: { employee } // Solo pasamos el empleado, el modal carga el resto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si retornó true, es que guardó correctamente
        this.loadData(); // Recargamos la lista para ver los cambios
        this.toast.success('Ficha laboral actualizada correctamente');
      }
    });
  }

  
}