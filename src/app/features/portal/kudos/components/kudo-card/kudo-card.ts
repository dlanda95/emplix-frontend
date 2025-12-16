import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Kudo, APPLAUSE_CONFIG } from '../../services/kudos.service';

@Component({
  selector: 'app-kudo-card',
  imports: [CommonModule, MatIconModule, DatePipe],
  templateUrl: './kudo-card.html',
  styleUrl: './kudo-card.scss',
})
export class KudoCard {
  @Input({ required: true }) kudo!: Kudo;

  // Helper para obtener la configuración visual basada en el código
  get categoryConfig() {
    return APPLAUSE_CONFIG.find(c => c.code === this.kudo.categoryCode);
  }

  // Generar iniciales (Ej: "Diego Landa" -> "DL")
  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
}


