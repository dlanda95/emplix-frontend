import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// 👇 Importamos el componente UI compartido y el Modelo
import { UserAvatar } from '@shared/components/ui/user-avatar/user-avatar';
import { Employee } from '@core/models/employee.model';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, MatIconModule, MatButtonModule,UserAvatar],
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {
// ✅ CAMBIO CLAVE: Recibimos el objeto completo
  @Input({ required: true }) employee!: Employee;
  
  // Mantenemos el rol para estilos condicionales (ej. borde diferente para el jefe)
  @Input() role: 'BOSS' | 'PEER' | 'SUBORDINATE' = 'PEER';

  // Helper simple para nombre completo
  get fullName(): string {
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }
}

