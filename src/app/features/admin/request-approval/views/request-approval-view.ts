import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog'; // Para ver detalles si quisieras
import { EmptyState } from '../../../../shared/components/ui/empty-state/empty-state';
import { RequestService } from '../../../portal/requests/services/request.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UserAvatar } from '../../../../shared/components/ui/user-avatar/user-avatar';
import { StatusBadge } from '../../../../shared/components/ui/status-badge/status-badge';

import { ContentLayoutView } from '../../../../shared/components/layout/content-layout-view/content-layout-view';
@Component({
  selector: 'app-request-approval',
  imports: [CommonModule,UserAvatar,
    MatTableModule,
    MatButtonModule,EmptyState,
    MatIconModule,
    MatChipsModule,StatusBadge,
    MatTooltipModule, ContentLayoutView],
  templateUrl: './request-approval-view.html',
  styleUrl: './request-approval-view.scss',
})
export class RequestApproval implements OnInit {
  private requestService = inject(RequestService);
  private toast = inject(ToastService);

  displayedColumns: string[] = ['employee', 'type', 'details', 'date', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.loadPending();
  }


  // Helper para obtener iniciales
  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  }

  // Helper para clases CSS de los badges
  getBadgeClass(type: string): string {
    switch (type) {
      case 'VACATION': return 'blue';
      case 'PROFILE_UPDATE': return 'purple';
      case 'SICK_LEAVE': return 'red';
      case 'PERMIT': return 'gray';
      case 'HOME_OFFICE': return 'green';
      default: return 'gray';
    }
  }

  loadPending() {
    this.requestService.getPendingRequests().subscribe({
      next: (data) => {
        // Aplanamos un poco la data para la tabla
        const mappedData = data.map(req => ({
          id: req.id,
          employeeName: `${req.user.employee.firstName} ${req.user.employee.lastName}`,
          position: req.user.employee.position?.name || 'N/A',
          type: req.type,
          typeLabel: this.getTypeLabel(req.type),
          details: this.formatDetails(req),
          date: req.createdAt,
          originalData: req // Guardamos todo por si acaso
        }));
        this.dataSource.data = mappedData;
      },
      error: () => this.toast.error('Error al cargar pendientes')
    });
  }

  process(req: any, status: 'APPROVED' | 'REJECTED') {
    const action = status === 'APPROVED' ? 'aprobar' : 'rechazar';
    
    if(confirm(`¿Estás seguro de ${action} esta solicitud de ${req.employeeName}?`)) {
      this.requestService.processRequest(req.id, status).subscribe({
        next: () => {
          this.toast.success(`Solicitud ${status === 'APPROVED' ? 'Aprobada' : 'Rechazada'}`);
          this.loadPending(); // Recargar lista
        },
        error: () => this.toast.error('Ocurrió un error al procesar')
      });
    }
  }

  // --- Helpers visuales (Reutilizables) ---
  getTypeLabel(type: string): string {
    const types: Record<string, string> = {
      'VACATION': 'Vacaciones',
      'PERMIT': 'Permiso',
      'SICK_LEAVE': 'Salud',
      'PROFILE_UPDATE': 'Datos Personales',
      'HOME_OFFICE': 'Home Office'
    };
    return types[type] || type;
  }

  formatDetails(req: any): string {
    if (req.type === 'PROFILE_UPDATE') {
      // Mostramos qué campos cambian (ej: phone, address)
      const keys = Object.keys(req.data || {});
      return `Cambios en: ${keys.join(', ')}`;
    }
    if (req.startDate) {
      const days = Math.ceil((new Date(req.endDate).getTime() - new Date(req.startDate).getTime()) / (86400000)) + 1;
      return `${days} días - ${req.reason || ''}`;
    }
    return req.reason || 'Sin detalles';
  }
}