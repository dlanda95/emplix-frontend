import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi-widget',
  imports: [CommonModule, MatIconModule],
  templateUrl: './kpi-widget.html',
  styleUrl: './kpi-widget.scss',
})
export class KpiWidget {

  @Input() title: string = '';
  @Input() value: string = '';
  @Input() unit: string = '';
  @Input() icon: string = 'analytics';
  @Input() footerText: string = '';
  @Input() trend: 'up' | 'down' | null = null;
  @Input() trendValue: string = '';
  
  // Variantes de color: 'primary' | 'blue' | 'green' | 'orange' | 'purple'
  @Input() colorVariant: string = 'primary';

  get colorClass(): string {
    return `color-${this.colorVariant}`;
  }
}
