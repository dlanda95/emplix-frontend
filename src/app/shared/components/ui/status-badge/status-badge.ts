import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Tipos de variantes visuales
type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {

  // El estado crudo (ej: 'APPROVED', 'PUNTUAL')
  status = input.required<string>();
  
  // Opcional: Si quieres forzar un texto diferente al status
  label = input<string>();

  // Lógica de Mapeo de Colores
  variantClass = computed((): BadgeVariant => {
    const s = this.status().toUpperCase();

    // 1. VERDE (Éxito / Bueno)
    if (['APPROVED', 'APROBADO', 'PUNTUAL', 'ACTIVO', 'VALID', 'COMPLETED'].includes(s)) {
      return 'success';
    }

    // 2. NARANJA (Atención / Pendiente)
    if (['PENDING', 'PENDIENTE', 'TARDE', 'LATE', 'REVIEW', 'WARNING'].includes(s)) {
      return 'warning';
    }

    // 3. ROJO (Error / Malo)
    if (['REJECTED', 'RECHAZADO', 'AUSENTE', 'ABSENT', 'INACTIVE', 'DELETED', 'ERROR'].includes(s)) {
      return 'danger';
    }

    // 4. AZUL (Info / Proceso)
    if (['DRAFT', 'SUBMITTED', 'PROCESO', 'PROCESSING'].includes(s)) {
      return 'info';
    }
    
    // 5. MORADO (Especiales)
    if (['SPECIAL', 'LEGAL', 'CONTRACT'].includes(s)) {
      return 'purple';
    }

    // Default: Gris
    return 'neutral';
  });

}
