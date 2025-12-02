import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface RequestItem {
  id: number;
  type: string;
  date: string;
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  details: string;
}

@Component({
  selector: 'app-request-list',
  imports: [CommonModule, MatIconModule],
  templateUrl: './request-list.html',
  styleUrl: './request-list.scss',
})
export class RequestList {
   @Input() items: RequestItem[] = [];

  getStatusClass(status: string) {
    switch (status) {
      case 'Aprobado': return 'status-approved';
      case 'Rechazado': return 'status-rejected';
      default: return 'status-pending';
    }
  }

}
