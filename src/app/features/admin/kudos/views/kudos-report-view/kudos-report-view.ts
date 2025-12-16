import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


import { KudosService, EmployeeKudoSummary, APPLAUSE_CONFIG } from '../../../../portal/kudos/services/kudos.service';
@Component({
  selector: 'app-kudos-report',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, DatePipe, DecimalPipe],
  templateUrl: './kudos-report-view.html',
  styleUrl: './kudos-report-view.scss',
})
export class KudosReportView implements OnInit {
  private service = inject(KudosService);

  reportData = signal<EmployeeKudoSummary[]>([]);
  categories = APPLAUSE_CONFIG; // Para iterar en las mini barras
  displayedColumns = ['employee', 'cycle', 'breakdown', 'count', 'score'];

  ngOnInit() {
    this.service.getHrReport().subscribe(data => {
      // Ordenar por Score descendente (Los mejores arriba)
      const sorted = data.sort((a, b) => b.totalScore - a.totalScore);
      this.reportData.set(sorted);
    });
  }
}
