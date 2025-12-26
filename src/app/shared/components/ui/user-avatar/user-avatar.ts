import { Component, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-user-avatar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {

  // Inputs
  name = input.required<string>();
  imageUrl = input<string | null | undefined>(null);
  size = input<AvatarSize>('md');
  
  // Estado interno para manejo de errores de imagen
  imgError = signal(false);

  // Lógica de Iniciales (Memoizada)
  initials = computed(() => {
    const n = this.name().trim();
    if (!n) return '';
    
    const parts = n.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  // Opcional: Colores consistentes (Guinda suave)
  // Podrías hacer una lógica para generar colores aleatorios basados en el nombre si quisieras
  bgColor = computed(() => 'var(--color-primary-soft)'); 
  textColor = computed(() => 'var(--color-primary)');

}
