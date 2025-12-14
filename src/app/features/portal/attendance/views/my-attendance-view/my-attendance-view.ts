import { Component, signal } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-attendance',
  imports: [CommonModule, MatButtonModule, MatIconModule, DatePipe, UpperCasePipe],
  templateUrl: './my-attendance-view.html',
  styleUrl: './my-attendance-view.scss',
})
export class MyAttendanceView {

  currentDate = new Date();
  currentMonthName = 'Diciembre';
  currentYear = 2025;

  // Mock Data (Esto vendrá del servicio)
  attendanceLogs = signal([
    { date: new Date('2025-12-14T08:30:00'), checkIn: new Date('2025-12-14T08:30:00'), checkOut: null, status: 'PUNTUAL', hoursWorked: 4.5 }, // Hoy
    { date: new Date('2025-12-13T08:25:00'), checkIn: new Date('2025-12-13T08:25:00'), checkOut: new Date('2025-12-13T18:00:00'), status: 'PUNTUAL', hoursWorked: 9.5 },
    { date: new Date('2025-12-12T09:10:00'), checkIn: new Date('2025-12-12T09:10:00'), checkOut: new Date('2025-12-12T17:50:00'), status: 'TARDE', hoursWorked: 8.6 },
    { date: new Date('2025-12-11T08:30:00'), checkIn: new Date('2025-12-11T08:30:00'), checkOut: new Date('2025-12-11T18:15:00'), status: 'PUNTUAL', hoursWorked: 9.7 },
  ]);

  stats = signal({
    punctuality: 92,
    lates: 1,
    totalHours: 168
  });

  changeMonth(delta: number) {
    // Lógica para cambiar fecha y recargar datos
    // this.currentDate.setMonth(this.currentDate.getMonth() + delta);
    // this.loadData();
  }
}


