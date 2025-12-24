import { Component, OnInit, inject,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports de Piezas Lego (Nombres en Inglés)
import { RequestStat } from '../../components/request-stat/request-stat';
import { RequestActions, RequestType } from '../../components/request-actions/request-actions';
import { RequestList, RequestItem } from '../../components/request-list/request-list';

import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // <--- Importar Dialog


// Modal Nuevo

import { TimeOffForm } from '../../components/time-off-form/time-off-form';

// Servicio
import { RequestService, RequestResponse,RequestPayload } from '../../services/request.service';
import { ToastService } from '../../../../../core/services/toast.service';

import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';


@Component({
  selector: 'app-requests',
  imports: [CommonModule, RequestStat, RequestActions, RequestList, MatDialogModule, ContentLayoutView],
  templateUrl: './requests-view.html',
  styleUrl: './requests-view.scss',
})
export class RequestsView implements OnInit {
  private requestService = inject(RequestService);
  private toast = inject(ToastService);
  private dialog = inject(MatDialog); // <--- Inyectar Dialog



  // Variable reactiva para el saldo
  vacationBalance = 0; // Inicializamos en 0
  
  // Stats calculados
  permitsCount = 0;
  pendingCount = 0;
  
  // DATA DE CONFIGURACIÓN (Tipos de solicitud disponibles)
  availableRequestTypes: RequestType[] = [
    { id: 'VACATION', label: 'Vacaciones', icon: 'beach_access', description: 'Solicita tus días de descanso físico anual.' },
    { id: 'PERMIT', label: 'Permiso Personal', icon: 'event_busy', description: 'Citas médicas, trámites o asuntos personales.' },
    { id: 'SICK_LEAVE', label: 'Descanso Médico', icon: 'medical_services', description: 'Reporta inasistencia por salud.' },
    { id: 'HOME_OFFICE', label: 'Home Office', icon: 'laptop_mac', description: 'Solicitud de trabajo remoto temporal.' },
  ];

  // Historial (Ahora se llena dinámicamente)
  history: RequestItem[] = [];
  loading = false;
  ngOnInit() {
    this.loadMyRequests();
    this.loadBalance(); // <--- Cargar Saldo
  }


loadMyRequests() {
    this.loading = true;
    this.requestService.getMyRequests().subscribe({
      next: (data) => {
        this.history = this.mapRequestsToView(data);
        // Calcular stats simples basados en el historial cargado
        this.permitsCount = data.filter(r => r.type === 'PERMIT').length;
        this.pendingCount = data.filter(r => r.status === 'PENDING').length;
        
        
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Error al cargar historial');
        this.loading = false;
      }
    });
  }



// Mapea la data del backend a la interfaz visual de la tabla
  private mapRequestsToView(apiData: RequestResponse[]): RequestItem[] {
    return apiData.map(req => ({
      id: req.id, // Ahora usamos el UUID
      type: this.getTypeLabel(req.type),
      date: new Date(req.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: this.getStatusLabel(req.status),
      details: this.formatDetails(req)
    }));
  }

  // Helpers de Formato
  private getTypeLabel(type: string): string {
    const types: Record<string, string> = {
      'VACATION': 'Vacaciones',
      'PERMIT': 'Permiso',
      'SICK_LEAVE': 'Descanso Médico',
      'HOME_OFFICE': 'Home Office',
      'PROFILE_UPDATE': 'Actualización Perfil'
    };
    return types[type] || type;
  }


private getStatusLabel(status: string): 'Pendiente' | 'Aprobado' | 'Rechazado' {
    const statuses: Record<string, any> = {
      'PENDING': 'Pendiente',
      'APPROVED': 'Aprobado',
      'REJECTED': 'Rechazado'
    };
    return statuses[status] || 'Pendiente';
  }



  private formatDetails(req: RequestResponse): string {
    if (req.type === 'PROFILE_UPDATE') return 'Solicitud de cambio de datos personales';
    
    if (req.startDate && req.endDate) {
      const start = new Date(req.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      const end = new Date(req.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      return `${start} al ${end} - ${req.reason || ''}`;
    }
    
    return req.reason || 'Sin detalles';
  }

 handleNewRequest(typeId: string) {
    const selectedType = this.availableRequestTypes.find(t => t.id === typeId);
    if (!selectedType) return;

    // Lógica para abrir el formulario correcto
    if (['VACATION', 'PERMIT', 'SICK_LEAVE', 'HOME_OFFICE'].includes(typeId)) {
      this.openTimeOffDialog(selectedType);
    } else {
      this.toast.info('Formulario en construcción');
    }
  }


  openTimeOffDialog(typeConfig: RequestType) {
    const dialogRef = this.dialog.open(TimeOffForm, {
      width: '500px',
      data: { label: typeConfig.label, description: typeConfig.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Armar el payload para el backend
        const payload: RequestPayload = {
          type: typeConfig.id as any,
          startDate: result.startDate.toISOString(),
          endDate: result.endDate.toISOString(),
          reason: result.reason
        };

        this.sendRequest(payload);
      }
    });
  }
  

  sendRequest(payload: RequestPayload) {
    this.requestService.createRequest(payload).subscribe({
      next: () => {
        this.toast.success('Solicitud enviada correctamente');
        this.loadMyRequests(); // Recargar la tabla
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Ocurrió un error al enviar la solicitud');
      }
    });
  }


loadBalance() {
    this.requestService.getVacationBalance().subscribe({
      next: (data) => {
        this.vacationBalance = data.balance;
      },
      error: () => console.error('No se pudo cargar el saldo de vacaciones')
    });
  }


}