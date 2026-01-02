import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Para menú de descargas

// 👇 1. IMPORTAMOS LOS MODELOS DESDE EL CORE (Aquí vive EmployeeKudoStats ahora)
import { EmployeeKudoStats } from '@core/models/kudos.model';

// 👇 2. IMPORTAMOS EL SERVICIO (Puede ser con alias o relativo)
import { KudosService } from '@features/portal/kudos/services/kudos.service';
import { KudosRankingTable } from '../../components/kudos-ranking-table/kudos-ranking-table';
import { ExportService } from '@core/services/export.service';
import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';
@Component({
  selector: 'app-kudos-report',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatButtonModule,
    MatIconModule,
    MatMenuModule,
    KudosRankingTable, ContentLayoutView],
  templateUrl: './kudos-report-view.html',
  styleUrl: './kudos-report-view.scss',
})
export class KudosReportView {
  private kudosService = inject(KudosService);
  private exportService = inject(ExportService);


  stats = signal<EmployeeKudoStats[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadData();
  }

  loadData() {
    this.kudosService.getHrAnalytics().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  // Lógica de Descarga EXCEL
  downloadExcel() {
    const rawData = this.stats().map(emp => ({
      Ranking: '', // Se llena en excel
      Empleado: emp.name,
      Cargo: emp.position?.name || emp.position,
      Total_Aplausos: emp.totalKudos,
      Puntaje: emp.totalScore,
      // Aplanamos el breakdown para que salga en celdas
      ...emp.breakdown 
    }));
    
    // Agregamos índice manualmente
    rawData.forEach((row, index) => row.Ranking = (index + 1).toString());

    this.exportService.exportToExcel(rawData, 'Reporte_Kudos_RRHH');
  }

  // Lógica de Descarga PDF
  downloadPdf() {
    const headers = ['#', 'Empleado', 'Cargo', 'Total', 'Score'];
    
    const rows = this.stats().map((emp, index) => [
      (index + 1).toString(),
      emp.name,
      emp.position?.name || emp.position || '-',
      emp.totalKudos.toString(),
      emp.totalScore.toFixed(1)
    ]);

    this.exportService.exportToPdf(headers, rows, 'Reporte_Kudos_RRHH', 'Ranking de Reconocimiento Organizacional');
  }
}