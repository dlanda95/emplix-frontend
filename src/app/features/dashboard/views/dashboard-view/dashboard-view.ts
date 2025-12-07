import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeBanner } from '../../home/components/welcome-banner/welcome-banner';
import { KpiWidget } from '../../home/components/kpi-widget/kpi-widget';
import { ClockWidget } from '../../home/components/clock-widget/clock-widget';
@Component({
  selector: 'app-dashboard-view',
  imports: [CommonModule, WelcomeBanner, KpiWidget,ClockWidget],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.scss',
})
export class DashboardView {
    currentUserRole: 'ADMIN' | 'RRHH' | 'EMPLEADO' = 'RRHH'; 
  currentUserName: string = 'Carlos Rodrigo';

}
