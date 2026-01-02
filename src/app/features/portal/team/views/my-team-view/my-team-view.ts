import { Component, signal,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TeamCard } from '../../components/team-card/team-card';
import { MatButtonModule } from '@angular/material/button';

import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
import { EmptyState } from '@shared/components/ui/empty-state/empty-state';
import { TeamContext } from '@core/models/employee.model';

import { EmployeesService } from '@core/services/employees.service';
// 1. DEFINIMOS LA INTERFAZ DE UN MIEMBRO DEL EQUIPO

// 2. DEFINIMOS LA ESTRUCTURA COMPLETA DE LA RESPUESTA

@Component({
  selector: 'app-my-team-view',
  imports: [EmptyState,CommonModule, MatIconModule, TeamCard, MatButtonModule, ContentLayoutView],
  templateUrl: './my-team-view.html',
  styleUrl: './my-team-view.scss',
})




export class MyTeamView implements OnInit {
  
  private employeesService = inject(EmployeesService); // Usaremos el servicio real

// Usamos signals para reactividad moderna
  loading = signal(true);
  
  // Inicializamos en null para saber cuándo aún no hay datos
  team = signal<TeamContext | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true); // Iniciamos carga

    // LLAMADA REAL AL BACKEND 📡
   this.employeesService.getMyTeamContext().subscribe({
      next: (data) => {
        this.team.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando equipo:', err);
        this.loading.set(false);
      }
    });
  }
}