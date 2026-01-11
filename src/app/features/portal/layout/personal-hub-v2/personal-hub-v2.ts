import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  employeeCode = signal('E-2024-99');

  // --- DATOS PARA CONTEXT CARD ---
  topTags: HeaderTag[] = [
    
    { label: 'Versión 2.0', variant: 'accent' },
    { label: 'Versión 2.0', variant: 'accent' }
  
  ];

   // Etiquetas para la línea de abajo (Blanco)
  bottomTags: HeaderTag[] = [
   
    { icon: 'verified', variant: 'icon-only', tooltip: 'Cuenta Verificada' },
     { label: 'Confidencial', variant: 'accent' }
  ];
  
  // --- 1. MENÚ LATERAL (IZQUIERDA) ---
  sideMenuItems: SideNavItem[] = [
    { id: 'general', label: 'Información General', icon: 'person', route: './general' },
    { id: 'history', label: 'Histórico Laboral', icon: 'history', route: './history' },
    { id: 'docs', label: 'Mis Documentos', icon: 'folder', route: './documents' },
    { id: 'salary', label: 'Estructura Salarial', icon: 'attach_money', route: './salary' }
  ];

  // --- 2. TABS INTERNOS (DERECHA) ---
  // Estos se mostrarían si estamos en la vista 'general'.
  // Idealmente, esto iría dentro del componente hijo (ej: GeneralInfoView),
  // pero lo pongo aquí para simular el efecto visual que pides.
  internalTabs: TabItem[] = [
    { label: 'Datos Personales', route: './general/personal', icon: 'face' },
    { label: 'Dirección', route: './general/address', icon: 'home' },
    { label: 'Familiares', route: './general/family', icon: 'group' }
  ];

}
