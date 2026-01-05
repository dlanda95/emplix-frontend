import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
import { CustomButton } from '@shared/components/custom-button/custom-button';
import { EmptyState } from '@shared/components/ui/empty-state/empty-state';
import { StatusBadge } from '@shared/components/ui/status-badge/status-badge';
import { ConfirmDialog, ConfirmDialogData } from '@shared/components/ui/confirm-dialog/confirm-dialog';
import { ToastService } from '@core/services/toast.service';

import { LaborService, WorkShift } from '../../services/labor.service';
import { ShiftForm } from '../../components/shift-form/shift-form';



@Component({
  selector: 'app-shifts-view',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatTooltipModule,
    ContentLayoutView, CustomButton, EmptyState, StatusBadge],
  templateUrl: './shifts-view.html',
  styleUrl: './shifts-view.scss',
})
export class ShiftsView implements OnInit {
  private service = inject(LaborService);
  private dialog = inject(MatDialog);
  private toast = inject(ToastService);

  shifts: WorkShift[] = [];
  displayedColumns = ['name', 'type', 'schedule', 'employees', 'actions'];

  ngOnInit() {
    this.loadShifts();
  }

  loadShifts() {
    this.service.getShifts().subscribe({
      next: (data) => this.shifts = data,
      error: () => this.toast.error('Error al cargar turnos')
    });
  }

  openForm(shift?: WorkShift) {
    const ref = this.dialog.open(ShiftForm, {
      width: '500px',
      data: { shift }
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        const obs = shift 
          ? this.service.updateShift(shift.id, result)
          : this.service.createShift(result);

        obs.subscribe({
          next: () => {
            this.loadShifts();
            this.toast.success(shift ? 'Turno actualizado' : 'Turno creado');
          },
          error: (err) => this.toast.error(err.error?.message || 'Error al guardar')
        });
      }
    });
  }

  deleteShift(shift: WorkShift) {
    const data: ConfirmDialogData = {
      title: '¿Eliminar Turno?',
      message: `Si eliminas "${shift.name}", asegúrate que nadie lo tenga asignado.`,
      confirmText: 'Eliminar',
      type: 'danger'
    };

    this.dialog.open(ConfirmDialog, { data, width: '400px' })
      .afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.service.deleteShift(shift.id).subscribe({
            next: () => {
              this.loadShifts();
              this.toast.success('Turno eliminado');
            },
            error: (err) => this.toast.error(err.error?.message || 'No se pudo eliminar')
          });
        }
      });
  }
}