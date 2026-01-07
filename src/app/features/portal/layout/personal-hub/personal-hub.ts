import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
import { GlassContainerComponent } from '@shared/ui/glass-container/glass-container.component';
@Component({
  selector: 'app-personal-hub',
  imports: [CommonModule,
    RouterOutlet,
    RouterLink, MatIconModule,
    RouterLinkActive,
    MatTabsModule,
    RouterLinkActive,
    MatTabsModule,
    ContentLayoutView,
    GlassContainerComponent],
  templateUrl: './personal-hub.html',
  styleUrl: './personal-hub.scss',
})
export class PersonalHubView {


  navLinks = [
    { path: 'profile', label: 'Mis Datos', icon: 'person' },
    { path: 'documents', label: 'Documentos', icon: 'description' },
    { path: 'credential', label: 'Fotocheck', icon: 'badge' },
    { path: 'assets', label: 'Activos', icon: 'devices' },
    { path: 'payments', label: 'Pagos', icon: 'payments' },
    { path: 'benefits', label: 'Beneficios', icon: 'loyalty' }
  ];

}
