import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeKudoStats } from '@core/models/kudos.model';
@Component({
  selector: 'app-kudos-ranking-table',
  imports: [CommonModule],
  templateUrl: './kudos-ranking-table.html',
  styleUrl: './kudos-ranking-table.scss',
})
export class KudosRankingTable {
// Recibe los datos desde el padre. No sabe de dónde vienen.
  @Input() data: EmployeeKudoStats[] = [];
  @Input() isLoading: boolean = false;

  // Colores para las categorías (Visual Only)
  categoryColors: Record<string, string> = {
    'TEAMWORK': '#3b82f6',
    'CLIENT_FOCUS': '#22c55e',
    'RESULTS': '#f97316',
    'INNOVATION': '#a855f7',
    'LEADERSHIP': '#eab308'
  };

  getBreakdownKeys(breakdown: any): string[] {
    return breakdown ? Object.keys(breakdown) : [];
  }
}
