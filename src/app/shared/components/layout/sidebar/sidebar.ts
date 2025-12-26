import { Component, input, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { UserAvatar } from '../../ui/user-avatar/user-avatar';

// Mantenemos tu interfaz
export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  roles: string[];
  children?: MenuItem[];
  isOpen?: boolean; // Control visual del acordeón
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, UserAvatar,
    RouterLinkActive, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar { // Renombrado a estandar Component
  
  // --- INPUTS (Signals) ---
  collapsed = input(false);
  userRole = input('EMPLEADO'); 
  userName = input('Usuario'); 
  userPhoto = input<string | null>(null);

  // --- DATA (Tu configuración exacta) ---
  // Usamos signal para que la vista detecte cambios en 'isOpen' eficientemente
  menuItems = signal<MenuItem[]>([
    { 
      label: 'Inicio', 
      icon: 'dashboard', 
      route: '/home', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'] 
    },
    { 
      label: 'Administración', 
      icon: 'admin_panel_settings', 
      roles: ['ADMIN', 'RRHH'],
      children: [
        { label: 'Nómina', route: '/home/admin/nomina', icon: 'payments', roles: ['ADMIN', 'RRHH'] },
        { label: 'Asistencia', route: '/home/admin/asistencia', icon: 'schedule', roles: ['ADMIN', 'RRHH'] },
        { label: 'Gestión Documental', route: '/home/admin/documental', icon: 'folder', roles: ['ADMIN', 'RRHH'] },
        { label: 'Bandeja Solicitudes', route: '/home/admin/solicitudes', icon: 'inbox', roles: ['ADMIN', 'RRHH'] },
        { label: 'Reporte Kudos', route: '/home/admin/reporte-kudo', icon: 'emoji_events', roles: ['ADMIN', 'RRHH'] },
      ]
    },
    { 
      label: 'Organización', 
      icon: 'corporate_fare', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'],
      children: [
        { label: 'Estructura', route: '/home/org/estructura', icon: 'domain', roles: ['ADMIN', 'RRHH'] },
        { label: 'Cargos', route: '/home/org/cargos', icon: 'badge', roles: ['ADMIN', 'RRHH'] },
        { label: 'Organigrama', route: '/home/org/organigrama', icon: 'account_tree', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Directorio', route: '/home/org/directorio', icon: 'contacts', roles: ['ADMIN', 'RRHH'] },
      ]
    },
    { 
      label: 'Talento', 
      icon: 'psychology', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'],
      children: [
        { label: 'Evaluaciones', route: '/home/talento/evaluaciones', icon: 'rate_review', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Capacitaciones', route: '/home/talento/capacitaciones', icon: 'school', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Encuestas', route: '/home/talento/encuestas', icon: 'poll', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
      ]
    },
    { 
      label: 'Mi Portal', 
      icon: 'badge', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'],
      children: [
        { label: 'Mis Datos', route: '/home/portal/perfil', icon: 'person', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
       { label: 'Asistencia', route: '/home/portal/mi-asistencia', icon: 'send', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
       
        { label: 'Solicitudes', route: '/home/portal/solicitudes', icon: 'send', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
     { label: 'Mis Documentos', route: '/home/portal/documentos', icon: 'description', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Mi Equipo', route: '/home/portal/mi-equipo', icon: 'groups', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Mis activos', route: '/home/portal/mis-activos', icon: 'devices', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Fotocheck', route: '/home/portal/fotocheck', icon: 'id_card', roles: ['ADMIN', 'RRHH','EMPLEADO'] }, // Corregido typo Fotocket
        { label: 'Beneficios', route: '/home/portal/beneficios', icon: 'loyalty', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Reconocimientos', route: '/home/portal/reconocimientos', icon: 'volunteer_activism', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Pagos', route: '/home/portal/mis-pagos', icon: 'paid', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
      ]
    },
    { 
      label: 'Configuración', 
      icon: 'settings', 
      roles: ['ADMIN'],
      children: [
        { label: 'Roles y Permisos', route: '/home/settings/roles', icon: 'security', roles: ['ADMIN'] },
        { label: 'Parámetros', route: '/home/settings/parametros', icon: 'tune', roles: ['ADMIN'] },
        { label: 'Integraciones', route: '/home/settings/integraciones', icon: 'hub', roles: ['ADMIN'] },
      ]
    },
  ]);

  constructor() {
    // REEMPLAZO MODERNO DE NGONCHANGES
    // Este efecto corre automáticamente cuando 'collapsed' cambia
    effect(() => {
      if (this.collapsed()) {
        this.closeAllGroups();
      }
    });
  }

  // LÓGICA DE PERMISOS
  hasPermission(allowedRoles: string[]): boolean {
    return allowedRoles.includes(this.userRole());
  }

  // Lógica recursiva: Si el usuario puede ver al menos un hijo, mostramos el padre
  hasGroupPermission(group: MenuItem): boolean {
    if (!this.hasPermission(group.roles)) return false;
    if (group.children) {
      return group.children.some(child => this.hasPermission(child.roles));
    }
    return true;
  }

  toggleGroup(item: MenuItem) {
    if (this.collapsed()) return;

    // Actualizamos el signal de forma inmutable (mejor práctica en Angular 17)
    this.menuItems.update(items => {
      return items.map(i => {
        if (i === item) {
          return { ...i, isOpen: !i.isOpen }; // Toggle clickeado
        }
        return { ...i, isOpen: false }; // Cerrar los demás (Acordeón)
      });
    });
  }

  closeAllGroups() {
    this.menuItems.update(items => items.map(i => ({ ...i, isOpen: false })));
  }

  get userInitials() {
    return this.userName().slice(0, 2).toUpperCase();
  }
}