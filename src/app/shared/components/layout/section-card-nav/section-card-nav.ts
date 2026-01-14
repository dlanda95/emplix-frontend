import { Component, input, OnInit, inject,signal,OnDestroy,output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { filter, Subscription } from 'rxjs';

// Importamos el TabStrip aquí porque ahora vive dentro del Layout
import { TapStrip, TabItem } from '@shared/components/layout/tap-strip/tap-strip';

export interface SideNavItem {
  id: string;      // Identificador único
  label: string;   // Texto a mostrar
  icon: string;    // Nombre del icono Material
  route?: string;  // Ruta (si usas routing)
}

@Component({
  selector: 'app-section-card-nav',
  imports: [CommonModule, MatIconModule, TapStrip,MatRippleModule, RouterLink, RouterLinkActive],
  templateUrl: './section-card-nav.html',
  styleUrl: './section-card-nav.scss',
})
export class SectionCardNav implements OnInit, OnDestroy{
private router = inject(Router);
  private sub?: Subscription;

  // --- INPUTS ---
  items = input.required<SideNavItem[]>(); // El menú lateral
  
  // 🔥 NUEVO: Recibe el diccionario de configuración
  tabsConfig = input<Record<string, TabItem[]>>({}); 

  // --- ESTADO INTERNO ---
  // El hijo calcula esto solo, el padre no necesita saberlo
  activeTabs = signal<TabItem[]>([]);

  ngOnInit() {
    // 1. Calcular al inicio
    this.calculateTabs(this.router.url);

    // 2. Calcular al navegar
    this.sub = this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd)
    ).subscribe((ev: any) => {
      this.calculateTabs(ev.urlAfterRedirects);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe(); // Limpieza automática
  }


  // LA LÓGICA QUE ANTES TENÍAS EN EL PADRE, AHORA VIVE AQUÍ
  private calculateTabs(url: string) {
    const config = this.tabsConfig(); // Leemos el diccionario
    const menuItems = this.items();   // Leemos el menú

    // Buscamos coincidencia
    const activeItem = menuItems.find(item => url.includes(`/${item.id}`));

    if (activeItem && config[activeItem.id]) {
      this.activeTabs.set(config[activeItem.id]);
    } else {
      this.activeTabs.set([]);
    }
  }

}
