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
import { ContentLayoutView } from '../../../../shared/components/layout/content-layout-view/content-layout-view';
import { MatSelectModule } from '@angular/material/select'; // <---
import { OrganizationService, } from '../../structure/services/organization.service';
import { PositionForm } from '../components/cargo-form/cargo-form';
import { StatusBadge } from '../../../../shared/components/ui/status-badge/status-badge';
import { EmptyState } from '../../../../shared/components/ui/empty-state/empty-state';
import { Position, Department } from '../../../../core/models/organization.model';
@Component({
  selector: 'app-positions-view',
  imports: [CommonModule,StatusBadge, EmptyState,MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatDialogModule, MatTooltipModule, MatSelectModule, MatSnackBarModule, ContentLayoutView],
  templateUrl: './cargos-view.html',
  styleUrl: './cargos-view.scss',
})
export class PositionsView implements OnInit {
  displayedColumns: string[] = ['name', 'department','description', 'employees', 'actions'];
  dataSource!: MatTableDataSource<Position>;
  departments: Department[] = []; // Para el filtro y el modal
  selectedDepartmentId: string | undefined = undefined; // Estado del filtro

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orgService: OrganizationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDepartments(); // Primero cargamos las áreas
    this.loadPositions();   // Luego los cargos
  }

  loadDepartments() {
    this.orgService.getDepartments().subscribe(deps => this.departments = deps);
  }

  loadPositions() {
    // Pasamos el ID seleccionado al servicio para que filtre en Backend (opcional)
    // O cargamos todo y filtramos en frontend. Para escalabilidad, mejor backend.
    this.orgService.getPositions(this.selectedDepartmentId).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => this.showNotification('Error al cargar datos', 'error')
    });
  }


  onFilterChange(departmentId: string | undefined) {
    this.selectedDepartmentId = departmentId;
    this.loadPositions(); // Recargamos la tabla con el filtro aplicado
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openDialog(position?: Position) {
    const dialogRef = this.dialog.open(PositionForm, {
      width: '500px',
      // Pasamos el cargo (si existe) Y la lista de departamentos
      data: { 
        position: position || null, 
        departments: this.departments 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (position) {
          this.orgService.updatePosition(position.id, result).subscribe({
            next: () => { this.loadPositions(); this.showNotification('Cargo actualizado'); },
            error: () => this.showNotification('Error al actualizar', 'error')
          });
        } else {
          this.orgService.createPosition(result).subscribe({
            next: () => { this.loadPositions(); this.showNotification('Cargo creado'); },
            error: (err) => this.showNotification(err.error?.message || 'Error', 'error')
          });
        }
      }
    });
  }

  deletePosition(pos: Position) {
    if(confirm(`¿Eliminar el cargo "${pos.name}"?`)) {
      this.orgService.deletePosition(pos.id).subscribe({
        next: () => { this.loadPositions(); this.showNotification('Cargo eliminado'); },
        error: (err) => this.showNotification(err.error?.message || 'No se puede eliminar', 'error')
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
