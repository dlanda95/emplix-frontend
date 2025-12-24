import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-layout-view',
  imports: [],
  templateUrl: './content-layout-view.html',
  styleUrl: './content-layout-view.scss',
})
export class ContentLayoutView {
// Datos obligatorios y opcionales
  title = input.required<string>();
  subtitle = input<string>(''); // Opcional
  
  // Opcional: Controlar si mostramos botón de "Atrás" (Back)
  showBackBtn = input(false);

  maxWidth = input<string>('1400px');

}
