import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Sidebar } from '../../../../shared/components/layout/sidebar/sidebar';
import { Topbar } from '../../../../shared/components/layout/topbar/topbar';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Sidebar, Topbar],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss',
})
export class Home {

  currentUserRole: 'ADMIN' | 'RRHH' | 'EMPLEADO' = 'RRHH'; 
  currentUserName: string = 'Carlos Rodrigo';

  isSidebarCollapsed = false;
  isMobile = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isSidebarCollapsed = false;
    } else {
      this.isSidebarCollapsed = true; 
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}