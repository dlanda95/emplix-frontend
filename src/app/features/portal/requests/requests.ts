import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports de Piezas Lego (Nombres en Inglés)
import { RequestStat } from './components/request-stat/request-stat';
import { RequestActions, RequestType } from './components/request-actions/request-actions';
import { RequestList, RequestItem } from './components/request-list/request-list';

@Component({
  selector: 'app-requests',
  imports: [CommonModule, RequestStat, RequestActions, RequestList],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests {



  
  // DATA DE CONFIGURACIÓN (Lego)
  availableRequestTypes: RequestType[] = [
    { id: 'vacaciones', label: 'Vacaciones', icon: 'beach_access', description: 'Solicita tus días de descanso físico anual.' },
    { id: 'permiso', label: 'Permiso Personal', icon: 'event_busy', description: 'Citas médicas, trámites o asuntos personales.' },
    { id: 'licencia', label: 'Licencia', icon: 'medical_services', description: 'Descanso médico o licencias especiales.' },
    { id: 'home_office', label: 'Home Office', icon: 'laptop_mac', description: 'Solicitud de trabajo remoto temporal.' },
  ];

  history: RequestItem[] = [
    { id: 101, type: 'Vacaciones', date: '20 Oct 2024', status: 'Aprobado', details: 'Del 01 Nov al 07 Nov (7 días)' },
    { id: 102, type: 'Permiso Personal', date: '15 Nov 2024', status: 'Pendiente', details: 'Cita médica - Mañana' },
    { id: 90, type: 'Home Office', date: '10 Sep 2024', status: 'Rechazado', details: 'Reunión presencial obligatoria' },
  ];

  handleNewRequest(typeId: string) {
    console.log('Request initiated:', typeId);
    alert(`Has seleccionado: ${typeId}.`);
  }
}


