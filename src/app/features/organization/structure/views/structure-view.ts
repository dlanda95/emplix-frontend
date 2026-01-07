import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmptyState } from '../../../../shared/components/ui/empty-state/empty-state';
import { ContentLayoutView } from '../../../../shared/components/layout/content-layout-view/content-layout-view';
// Modelos y Servicios
import { OrganizationService } from '../../../../core/services/organization.service';
import { Department } from '../../../../core/models/organization.model';
import { ToastService } from '../../../../core/services/toast.service';

// Componentes Hijos (Diálogos)
import { DepartmentDialog } from '../components/department-dialog/department-dialog';
import { PositionsManager } from '../components/cargos-manager/positions-manager';
import { SkeletonLoader } from '@shared/components/ui/skeleton-loader/skeleton-loader';
// 👇 IMPORTAR TU DIÁLOGO REUTILIZABLE
import { ConfirmDialog, ConfirmDialogData } from '@shared/components/ui/confirm-dialog/confirm-dialog';

import { CustomButton } from '@shared/components/custom-button/custom-button';
@Component({
  selector: 'app-org-chart-view',
  imports: [CommonModule,SkeletonLoader,CustomButton,EmptyState,
    MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatDialogModule, ContentLayoutView],
  templateUrl: './structure-view.html',
  styleUrl: './structure-view.scss',
})
export class OrgChartView implements OnInit {
  departments: Department[] = [];
  loading = true;

  private service = inject(OrganizationService);
  private dialog = inject(MatDialog);
  private toast = inject(ToastService);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // 1. Crear o Editar Departamento
  openDepartmentDialog(dept?: Department) {
    const dialogRef = this.dialog.open(DepartmentDialog, {
      width: '500px',
      data: dept || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData(); // Si guardó, recargamos
    });
  }

  // 2. Gestionar Cargos (El nuevo componente)
  openPositionsDialog(dept: Department) {
    const dialogRef = this.dialog.open(PositionsManager, {
      width: '600px',
      data: dept,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadData(); // Recargamos para actualizar contadores
    });
  }

  // 3. Eliminar Departamento (CON CONFIRM DIALOG)
  deleteDepartment(dept: Department) {
    // Configuración del modal
    const dialogData: ConfirmDialogData = {
      title: '¿Eliminar Área?',
      message: `Estás a punto de eliminar el área "${dept.name}". Esto podría afectar a los cargos y empleados asignados.`,
      confirmText: 'Eliminar',
      type: 'danger',
      icon: 'domain_disabled'
    };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      panelClass: 'aesthetic-dialog',
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
         this.service.deleteDepartment(dept.id).subscribe({
           next: () => {
             this.toast.success('Departamento eliminado correctamente');
             this.loadData();
           },
           error: (err) => {
             this.toast.error(err.error?.message || 'No se pudo eliminar el área');
           }
         });
      }
    });
  }
}