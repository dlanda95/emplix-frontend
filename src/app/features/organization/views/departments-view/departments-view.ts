import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { OrganizationService, Department } from '../../services/organization.service';
import { DepartmentForm } from '../../components/department-form/department-form';

@Component({
  selector: 'app-departments-view',
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule],
  templateUrl: './departments-view.html',
  styleUrl: './departments-view.scss',
})
export class DepartmentsView implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'employees', 'actions'];
  dataSource!: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orgService: OrganizationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.orgService.getDepartments().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => this.showNotification('Error al cargar departamentos', 'error')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(department?: Department) {
    const dialogRef = this.dialog.open(DepartmentForm, {
      width: '500px',
      data: department || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (department) {
          // Editar
          this.orgService.updateDepartment(department.id, result).subscribe({
            next: () => {
              this.loadDepartments();
              this.showNotification('Departamento actualizado');
            },
            error: () => this.showNotification('Error al actualizar', 'error')
          });
        } else {
          // Crear
          this.orgService.createDepartment(result).subscribe({
            next: () => {
              this.loadDepartments();
              this.showNotification('Departamento creado exitosamente');
            },
            error: (err) => {
               // Manejo básico de error (ej. duplicado)
               const msg = err.error?.message || 'Error al crear';
               this.showNotification(msg, 'error');
            }
          });
        }
      }
    });
  }

  deleteDepartment(dept: Department) {
    if(confirm(`¿Estás seguro de eliminar ${dept.name}?`)) {
      this.orgService.deleteDepartment(dept.id).subscribe({
        next: () => {
          this.loadDepartments();
          this.showNotification('Departamento eliminado');
        },
        error: (err) => {
          const msg = err.error?.message || 'No se puede eliminar';
          this.showNotification(msg, 'error');
        }
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}