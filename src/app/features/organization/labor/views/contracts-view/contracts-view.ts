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

import { LaborService, ContractType } from '../../services/labor.service';
import { ContractForm } from '../../components/contract-form/contract-form';



@Component({
  selector: 'app-contracts-view',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatTooltipModule,
    ContentLayoutView, CustomButton, EmptyState, StatusBadge],
  templateUrl: './contracts-view.html',
  styleUrl: './contracts-view.scss',
})
export class ContractsView implements OnInit {
  private service = inject(LaborService);
  private dialog = inject(MatDialog);
  private toast = inject(ToastService);

  contracts: ContractType[] = [];
  displayedColumns = ['name', 'code', 'type', 'benefits', 'employees', 'actions'];

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.service.getContracts().subscribe({
      next: (data) => this.contracts = data,
      error: () => this.toast.error('Error al cargar contratos')
    });
  }

  openForm(contract?: ContractType) {
    const ref = this.dialog.open(ContractForm, {
      width: '500px',
      data: { contract }
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        const obs = contract 
          ? this.service.updateContract(contract.id, result)
          : this.service.createContract(result);

        obs.subscribe({
          next: () => {
            this.loadContracts();
            this.toast.success(contract ? 'Contrato actualizado' : 'Contrato creado');
          },
          error: (err) => this.toast.error(err.error?.message || 'Error al guardar')
        });
      }
    });
  }

  deleteContract(contract: ContractType) {
    const data: ConfirmDialogData = {
      title: '¿Eliminar Contrato?',
      message: `Si eliminas "${contract.name}", asegúrate que nadie lo tenga asignado.`,
      confirmText: 'Eliminar',
      type: 'danger'
    };

    this.dialog.open(ConfirmDialog, { data, width: '400px' })
      .afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.service.deleteContract(contract.id).subscribe({
            next: () => {
              this.loadContracts();
              this.toast.success('Contrato eliminado');
            },
            error: (err) => this.toast.error(err.error?.message || 'No se pudo eliminar')
          });
        }
      });
  }
}