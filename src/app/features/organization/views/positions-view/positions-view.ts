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

import { OrganizationService, Position } from '../../services/organization.service';
import { PositionForm } from '../../components/position-form/position-form';

@Component({
  selector: 'app-positions-view',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatDialogModule, MatTooltipModule, MatSnackBarModule],
  templateUrl: './positions-view.html',
  styleUrl: './positions-view.scss',
})
export class PositionsView implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'employees', 'actions'];
  dataSource!: MatTableDataSource<Position>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orgService: OrganizationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions() {
    this.orgService.getPositions().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => this.showNotification('Error al cargar cargos', 'error')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openDialog(position?: Position) {
    const dialogRef = this.dialog.open(PositionForm, {
      width: '500px',
      data: position || null
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
            error: (err) => this.showNotification(err.error?.message || 'Error al crear', 'error')
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
