import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu'; // IMPORTANTE: Para el menú flotante

// Interfaz para definir la estructura del menú
interface MenuItem {
  label: string;
  icon: string;
  route?: string; // Opcional si es un grupo
  roles: string[]; // Roles permitidos
  children?: MenuItem[]; // Submenús
  isOpen?: boolean; // Estado visual (Expandido/Colapsado)
}


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule, MatRippleModule, MatTooltipModule,MatMenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnChanges {
  @Input() collapsed = false;
  @Input() userRole: string = 'EMPLEADO';
  @Input() userName: string = 'Usuario';

  // DEFINICIÓN EXACTA DE TU MENÚ
  menuItems: MenuItem[] = [
    // 1. INICIO
    { 
      label: 'Inicio', 
      icon: 'dashboard', 
      route: '/home', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'] 
    },
    
    // 2. ADMINISTRACIÓN
    { 
      label: 'Administración', 
      icon: 'admin_panel_settings', 
      roles: ['ADMIN', 'RRHH'],
      children: [
        { label: 'Nómina', route: '/home/admin/nomina', icon: '', roles: ['ADMIN', 'RRHH'] },
        { label: 'Asistencia', route: '/home/admin/asistencia', icon: '', roles: ['ADMIN', 'RRHH'] },
        { label: 'Gestión Documental', route: '/home/admin/documental', icon: '', roles: ['ADMIN', 'RRHH'] },
        { label: 'Bandeja Solicitudes', route: '/home/admin/solicitudes', icon: 'inbox', roles: ['ADMIN', 'RRHH'] },
      ]
    },

    // 3. ORGANIZACIÓN
    { 
      label: 'Organización', 
      icon: 'corporate_fare', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'], // El grupo es visible para todos (por organigrama)
      children: [
        { label: 'Estructura', route: '/home/org/estructura', icon: '', roles: ['ADMIN', 'RRHH'] },
        { label: 'Cargos', route: '/home/org/cargos', icon: '', roles: ['ADMIN', 'RRHH'] },
        { label: 'Organigrama', route: '/home/org/organigrama', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Directorio', route: '/home/org/directorio', icon: '', roles: ['ADMIN', 'RRHH'] },
        
      ]
    },

    // 4. EVALUACIÓN Y DESARROLLO
    { 
      label: 'Talento', 
      icon: 'psychology', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'],
      children: [
        { label: 'Evaluaciones', route: '/home/talento/evaluaciones', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Capacitaciones', route: '/home/talento/capacitaciones', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Encuestas', route: '/home/talento/encuestas', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
      ]
    },

    // 5. PORTAL COLABORADOR
    { 
      label: 'Mi Portal', 
      icon: 'badge', 
      roles: ['ADMIN', 'RRHH', 'EMPLEADO'],
      children: [
        { label: 'Mis Datos', route: '/home/portal/perfil', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Solicitudes', route: '/home/portal/solicitudes', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Boletas de Pago', route: '/home/portal/boletas', icon: '', roles: ['ADMIN', 'RRHH', 'EMPLEADO'] },
        { label: 'Mis Documentos', route: '/home/portal/documentos', icon: '', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        
        { label: 'Mi Equipo', route: '/home/portal/mi-equipo', icon: '', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Mis activos', route: '/home/portal/mis-activos', icon: '', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Fotocket', route: '/home/portal/fotocheck', icon: '', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
        { label: 'Beneficios', route: '/home/portal/beneficios', icon: '', roles: ['ADMIN', 'RRHH','EMPLEADO'] },
      ]
    },

    // 6. CONFIGURACIÓN
    { 
      label: 'Configuración', 
      icon: 'settings', 
      roles: ['ADMIN'],
      children: [
        { label: 'Roles y Permisos', route: '/home/settings/roles', icon: '', roles: ['ADMIN'] },
        { label: 'Parámetros', route: '/home/settings/parametros', icon: '', roles: ['ADMIN'] },
        { label: 'Integraciones', route: '/home/settings/integraciones', icon: '', roles: ['ADMIN'] },
      ]
    },
  ];

  ngOnChanges() {
    // Si colapsamos el sidebar, cerramos todos los grupos para limpieza visual
    if (this.collapsed) {
      this.menuItems.forEach(item => item.isOpen = false);
    }
  }

  get userInitials() {
    return this.userName.slice(0, 2).toUpperCase();
  }

  // Valida si el usuario tiene rol para un item simple
  hasPermission(allowedRoles: string[]): boolean {
    return allowedRoles.includes(this.userRole);
  }

  // Valida si el usuario debe ver un GRUPO (si tiene permiso para al menos 1 hijo)
  hasGroupPermission(group: MenuItem): boolean {
    if (this.hasPermission(group.roles)) {
      // Si tiene permiso explícito en el padre, verificamos si tiene hijos visibles
      return group.children ? group.children.some(child => this.hasPermission(child.roles)) : true;
    }
    return false;
  }

  toggleGroup(item: MenuItem) {
    if (this.collapsed) return; // No abrir acordeón si está colapsado (UX)
    
    // Opcional: Cerrar otros grupos al abrir uno (Acordeón estricto)
    this.menuItems.forEach(i => {
      if (i !== item) i.isOpen = false;
    });

    item.isOpen = !item.isOpen;
  }
}