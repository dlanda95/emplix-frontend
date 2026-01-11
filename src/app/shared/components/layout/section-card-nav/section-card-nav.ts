import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';



export interface SideNavItem {
  id: string;      // Identificador único
  label: string;   // Texto a mostrar
  icon: string;    // Nombre del icono Material
  route?: string;  // Ruta (si usas routing)
}

@Component({
  selector: 'app-section-card-nav',
  imports: [CommonModule, MatIconModule, MatRippleModule, RouterLink, RouterLinkActive],
  templateUrl: './section-card-nav.html',
  styleUrl: './section-card-nav.scss',
})
export class SectionCardNav {

 // Solo necesitamos los items
  items = input.required<SideNavItem[]>();
  
  // Evento opcional
  itemSelected = output<SideNavItem>();

  onSelect(item: SideNavItem) {
    this.itemSelected.emit(item);
  }

}
