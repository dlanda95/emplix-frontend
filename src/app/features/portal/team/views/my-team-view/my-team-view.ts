import { Component, signal,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TeamCard } from '../../components/team-card/team-card';
import { MatButtonModule } from '@angular/material/button';
import { EmployeesService } from '../../../../organization/directory/services/employee.service'; // Asegura la ruta correcta

// 1. DEFINIMOS LA INTERFAZ DE UN MIEMBRO DEL EQUIPO
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  position?: { name: string }; // '?' porque puede ser null
  user?: { email: string };    // '?' porque puede ser null
}

// 2. DEFINIMOS LA ESTRUCTURA COMPLETA DE LA RESPUESTA
export interface TeamContext {
  me: TeamMember | null;
  supervisor: TeamMember | null;
  peers: TeamMember[];
  subordinates: TeamMember[];
}


@Component({
  selector: 'app-my-team-view',
  imports: [CommonModule, MatIconModule, TeamCard, MatButtonModule],
  templateUrl: './my-team-view.html',
  styleUrl: './my-team-view.scss',
})




export class MyTeamView implements OnInit {
  
  private employeeService = inject(EmployeesService); // Usaremos el servicio real

  // 3. INICIALIZAMOS EL SIGNAL CON LA ESTRUCTURA CORRECTA
  team = signal<TeamContext>({
    me: null,
    supervisor: null,
    peers: [],       // Ya no es 'never[]', ahora es 'TeamMember[]'
    subordinates: [] // Igual aquí
  });

  loading = signal(true);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true); // Iniciamos carga

    // LLAMADA REAL AL BACKEND 📡
    this.employeeService.getMyTeam().subscribe({
      next: (data) => {
        // Asignamos la respuesta del backend directamente
        this.team.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando equipo:', err);
        this.loading.set(false); // Detenemos carga aunque falle
      }
    });
  }
}