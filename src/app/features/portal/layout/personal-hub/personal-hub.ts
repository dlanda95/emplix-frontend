import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Importamos nuestros nuevos Legos


import { ContentLayout } from '@shared/components/layout/content-layout/content-layout';


import { CustomButton } from '@shared/components/custom-button/custom-button';
import { TabItem, TapStrip } from '@shared/components/layout/tap-strip/tap-strip';

import { StatusBadge } from '@shared/components/ui/status-badge/status-badge';
import { ActionHeader } from '@shared/components/layout/action-header/action-header';


// TUS COMPONENTES (Asegúrate de importar los paths correctos)
import { ContextCard, HeaderTag } from '@shared/components/layout/context-card/context-card';
import { SectionCard } from '@shared/components/layout/section-card/section-card';


import { InfoSection } from '@features/portal/profile/components/info-section/info-section';


@Component({
  selector: 'app-personal-hub',
  imports: [CommonModule, SectionCard, ContextCard, RouterOutlet, StatusBadge, MatButtonModule, MatIconModule,
    ContentLayout, ActionHeader, CustomButton, TapStrip
  ],
  templateUrl: './personal-hub.html',
  styleUrl: './personal-hub.scss',
})
export class PersonalHubView {

  employeeCode = signal('987654');
  // Etiquetas para la línea de arriba (Plomo)
  topTags: HeaderTag[] = [
    { label: 'Confidencial', variant: 'accent' },
    { label: 'Confidencial', variant: 'glass' }
  ];

  // Etiquetas para la línea de abajo (Blanco)
  bottomTags: HeaderTag[] = [
   
    { icon: 'verified', variant: 'icon-only', tooltip: 'Cuenta Verificada' },
     { label: 'Confidencial', variant: 'accent' }
  ];

  navLinks: TabItem[] = [
    { route: 'profile', label: 'Mis Datos', icon: 'person' },
    { route: 'documents', label: 'Documentos', icon: 'folder' },
    { route: 'benefits', label: 'Beneficios', icon: 'star' }
  ];
}
