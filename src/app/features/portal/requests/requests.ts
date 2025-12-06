import { Component, OnInit, inject,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports de Piezas Lego (Nombres en Inglés)
import { RequestStat } from './components/request-stat/request-stat';
import { RequestActions, RequestType } from './components/request-actions/request-actions';
import { RequestList, RequestItem } from './components/request-list/request-list';

// Servicio
import { RequestService, RequestResponse } from '../services/request.service';
import { ToastService } from '../../../core/services/toast.service';


@Component({
  selector: 'app-requests',
  imports: [CommonModule, RequestStat, RequestActions, RequestList],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests implements OnInit {
  private requestService = inject(RequestService);
  private toast = inject(ToastService);


  
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
  }


loadMyRequests() {
    this.loading = true;
    this.requestService.getMyRequests().subscribe({
      next: (data) => {
        this.history = this.mapRequestsToView(data);
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
    // Aquí abriremos el Modal de Nueva Solicitud en el futuro
    console.log('Iniciar solicitud:', typeId);
    this.toast.info(`Próximamente: Formulario para ${typeId}`);
  }
}