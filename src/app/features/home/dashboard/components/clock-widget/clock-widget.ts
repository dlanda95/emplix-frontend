import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AttendanceService } from '@core/services/attendance.service';
import { ToastService } from '@core/services/toast.service';

import { CustomButton } from '@shared/components/custom-button/custom-button';

@Component({
  selector: 'app-clock-widget',
  imports: [CommonModule, MatIconModule, MatButtonModule,CustomButton],
  providers: [DatePipe],
  templateUrl: './clock-widget.html',
  styleUrl: './clock-widget.scss',
})
export class ClockWidget implements OnInit, OnDestroy {
  private attendanceService = inject(AttendanceService);
  private toast = inject(ToastService);

  today = new Date();
  timeDisplay: string = '00:00:00';
  currentStatus: 'NOT_STARTED' | 'WORKING' | 'COMPLETED' = 'NOT_STARTED';
  statusMessage: string = 'Listo para iniciar';
  attendanceRecord: any = null;
  
  loading = false;
  private timerInterval: any;

  ngOnInit() {
    this.initClock(); // Reloj visual inmediato
    this.loadStatus();
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  // Cargar estado desde Backend
  loadStatus() {
    this.attendanceService.getTodayStatus().subscribe({
      next: (res) => {
        this.currentStatus = res.status;
        this.attendanceRecord = res.record;
        this.updateUIState();
      },
      error: () => this.toast.error('Error conectando con el reloj')
    });
  }

  // Lógica del Reloj
  initClock() {
    this.updateTime(); // Ejecutar ya
    this.timerInterval = setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    // Si estamos trabajando, mostramos tiempo transcurrido
    if (this.currentStatus === 'WORKING' && this.attendanceRecord?.checkIn) {
      const start = new Date(this.attendanceRecord.checkIn).getTime();
      const now = new Date().getTime();
      const diff = now - start;
      this.timeDisplay = this.formatDuration(diff);
    } else {
      // Si no, mostramos hora actual
      const now = new Date();
      this.timeDisplay = now.toLocaleTimeString('en-US', { hour12: false });
    }
  }

  updateUIState() {
    if (this.currentStatus === 'NOT_STARTED') this.statusMessage = 'Registra tu entrada';
    if (this.currentStatus === 'WORKING') this.statusMessage = 'Tiempo transcurrido';
    if (this.currentStatus === 'COMPLETED') {
      this.statusMessage = '¡Hasta mañana!';
      // Calcular total trabajado estático
      if (this.attendanceRecord.checkIn && this.attendanceRecord.checkOut) {
        const diff = new Date(this.attendanceRecord.checkOut).getTime() - new Date(this.attendanceRecord.checkIn).getTime();
        this.timeDisplay = this.formatDuration(diff);
      }
    }
  }

  handleClockIn() {
    this.loading = true;
    this.attendanceService.clockIn().subscribe({
      next: (record) => {
        this.currentStatus = 'WORKING';
        this.attendanceRecord = record;
        this.loading = false;
        this.toast.success('¡Bienvenido! Entrada registrada.');
        this.updateUIState();
      },
      error: (err) => {
        this.toast.error(err.error?.message || 'Error al marcar');
        this.loading = false;
      }
    });
  }

  handleClockOut() {
    if(!confirm('¿Seguro que deseas finalizar tu jornada?')) return;
    
    this.loading = true;
    this.attendanceService.clockOut().subscribe({
      next: (res) => {
        this.currentStatus = 'COMPLETED';
        this.attendanceRecord = res; // Registro actualizado con checkOut
        this.loading = false;
        this.toast.success('Salida registrada. ¡Buen descanso!');
        this.updateUIState();
      },
      error: (err) => {
        this.toast.error(err.error?.message || 'Error al marcar');
        this.loading = false;
      }
    });
  }

  // Helper para HH:MM:SS
  private formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  }
}