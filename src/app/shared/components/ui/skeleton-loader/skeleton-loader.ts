import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-skeleton-loader',
  imports: [],
  templateUrl: './skeleton-loader.html',
  styleUrl: './skeleton-loader.scss',
})
export class SkeletonLoader {

  @Input() variant: 'text' | 'circular' | 'rectangular' = 'text';
  @Input() width: string = '100%';
  @Input() height: string = '1rem'; // Altura por defecto para texto
  @Input() radius: string = ''; // Opcional: forzar radio

}
