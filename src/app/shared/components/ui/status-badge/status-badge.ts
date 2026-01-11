import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// Tipos de variantes visuales
export type BadgeVariant = 'default' | 'glass' | 'accent' | 'icon-only' | 'outline';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
// CONFIGURACIÓN VISUAL
  variant = input<BadgeVariant>('default'); // 'default', 'glass', 'accent', etc.
  
  // DATOS
  status = input<string>('default'); // Para clases CSS tipo .status-active (opcional si usas variant)
  label = input<string>('');         // Texto a mostrar
  icon = input<string>('');          // Icono a mostrar
  tooltip = input<string>('');       // Tooltip al pasar el mouse

}
