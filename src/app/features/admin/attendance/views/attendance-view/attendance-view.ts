import { Component, OnInit, inject,signal } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
// Servicio


import { AttendanceService,DailyAttendanceLog } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-view',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule,DatePipe],
  templateUrl: './attendance-view.html',
  styleUrl: './attendance-view.scss',
})
export class AttendanceView implements OnInit {
  private attendanceService = inject(AttendanceService);
  
  // Columnas para la tabla Material
  displayedColumns: string[] = ['employee', 'checkIn', 'checkOut', 'status', 'actions'];

  // Datos simulados (Aquí conectarás tu AttendanceService)
// Signals para reactividad
  logs = signal<DailyAttendanceLog[]>([]);
  filteredLogs = signal<DailyAttendanceLog[]>([]);
  
  // KPIs calculados
  stats = signal({ present: 0, late: 0, absent: 0, total: 0 });

  ngOnInit() {

    this.loadReport();
    // this.loadAttendance();

    
  }

  loadReport() {
    this.attendanceService.getDailyReport().subscribe(data => {
      this.logs.set(data);
      this.filteredLogs.set(data);
      this.calculateStats(data);
    });
  }


calculateStats(data: DailyAttendanceLog[]) {
    const present = data.filter(l => l.status !== 'AUSENTE').length;
    const late = data.filter(l => l.status === 'TARDE').length;
    const absent = data.filter(l => l.status === 'AUSENTE').length;
    
    this.stats.set({
      present,
      late,
      absent,
      total: data.length > 0 ? Math.round((present / data.length) * 100) : 0
    });
  }



  applyFilter(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredLogs.set(
      this.logs().filter(l => l.name.toLowerCase().includes(term))
    );
  }
}