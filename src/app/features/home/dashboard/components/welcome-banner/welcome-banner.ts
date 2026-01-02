import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-welcome-banner',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.scss',
})
export class WelcomeBanner {



  @Input() userName: string = '';
  @Input() role: string = 'EMPLEADO';
  @Input() pendingTasks: number = 0;
  @Input() isBirthday: boolean = false;

  get message(): string {
    if (this.isBirthday) return '¡Feliz cumpleaños! Hoy es tu día especial 🎉';
    if (this.role === 'ADMIN') return 'Panel de Control del Sistema';
    return 'Bienvenido a tu portal de empleado. Aquí tienes tu resumen.';
  }

  get variantClass(): string {
    if (this.isBirthday) return 'variant-birthday';
    if (this.role === 'ADMIN') return 'variant-admin';
    return 'variant-default';
  }

  get bgIcon(): string {
    if (this.isBirthday) return 'cake';
    if (this.role === 'ADMIN') return 'admin_panel_settings';
    return 'sentiment_very_satisfied';
  }
}

