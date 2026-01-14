import { Component, signal,OnInit,inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
// Componentes Personalizados
import { ContextCard, HeaderTag } from '@shared/components/layout/context-card/context-card';
import { StatusBadge } from '@shared/components/ui/status-badge/status-badge';
// NUEVO COMPONENTE

import { SectionCardNav, SideNavItem } from '@shared/components/layout/section-card-nav/section-card-nav';
// TABS INTERNOS
import { TapStrip, TabItem } from '@shared/components/layout/tap-strip/tap-strip';
import { SectionCard } from "@shared/components/layout/section-card/section-card";

@Component({
  selector: 'app-personal-hub-v2',
  imports: [RouterOutlet, ContextCard, StatusBadge,
    SectionCardNav, TapStrip],
  templateUrl: './personal-hub-v2.html',
  styleUrl: './personal-hub-v2.scss',
})
export class PersonalHubV2 {

private router = inject(Router);
// DATOS HEADER
  employeeCode = signal('E-2024-99');
  topTags: HeaderTag[] = [{ label: 'Versión 2.0', variant: 'accent' }];
   // Etiquetas para la línea de abajo (Blanco)
  bottomTags: HeaderTag[] = [
    { icon: 'verified', variant: 'icon-only', tooltip: 'Cuenta Verificada' },
     { label: 'Confidencial', variant: 'accent' }
  ];
  
  // --- 1. MENÚ LATERAL (IZQUIERDA) ---
 sideMenuItems: SideNavItem[] = [
    { id: 'general', label: 'Información General', icon: 'person', route: './general/info' },
    { id: 'laboral', label: 'Histórico Laboral', icon: 'history', route: './laboral' },
    { id: 'docs',    label: 'Documentos', icon: 'folder', route: './docs' }
  ];

  // --- 2. TABS INTERNOS (DERECHA) ---
  // Estos se mostrarían si estamos en la vista 'general'.
  // Idealmente, esto iría dentro del componente hijo (ej: GeneralInfoView),
  // pero lo pongo aquí para simular el efecto visual que pides.
  // DATOS TABS INTERNOS (Configuración pura)
  internalTabsConfig: Record<string, TabItem[]> = {
    'general': [
      { label: 'Mis Datos', route: './general/info', icon: 'face' },
      { label: 'Dirección', route: './general/address', icon: 'place' },
      { label: 'Familia',   route: './general/family',  icon: 'group' },
      { label: 'Contacto',  route: './general/contact', icon: 'contacts' }
    ],
    'laboral': [
      { label: 'Historial',  route: './laboral/history',  icon: 'history' },
      { label: 'Beneficios', route: './laboral/benefits', icon: 'star' }
    ],
    'docs': [
      { label: 'Legales', route: './docs/legal', icon: 'gavel' }
    ]
  };


}
