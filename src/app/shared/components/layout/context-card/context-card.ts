import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusBadge,BadgeVariant } from '@shared/components/ui/status-badge/status-badge';

// 1. DEFINIMOS EL MODELO DE DATOS PARA LAS ETIQUETAS
export interface HeaderTag {
  label?: string;
  icon?: string;
  variant: BadgeVariant; // 'glass' | 'accent' | 'icon-only'
  tooltip?: string;
  status?: string; // Opcional, por si quieres pasar clases extra (ej: 'locked')
}

@Component({
  selector: 'app-context-card',
  imports: [CommonModule, MatIconModule,StatusBadge],
  templateUrl: './context-card.html',
  styleUrl: './context-card.scss',
})
export class ContextCard {
// DATOS PRINCIPALES
  icon = input<string>('');
  
  // LÍNEA 1 (Plomo)
  overline = input<string>(''); 
  overlineTags = input<HeaderTag[]>([]); // <--- Recibe lista de etiquetas

  // LÍNEA 2 (Blanco)
  headline = input<string>('');
  headlineTags = input<HeaderTag[]>([]); // <--- Recibe lista de etiquetas

}
