import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  
  // Usamos Signals de Angular 17+ para reactividad fácil
  // Valor inicial: lo que diga el environment (por defecto 'demo')
  private tenantSlug = signal<string>(environment.defaultTenant);

  constructor() { 
    // Opcional: Recuperar del localStorage si el usuario recarga la página
    const stored = localStorage.getItem('selected_tenant');
    if (stored) {
      this.tenantSlug.set(stored);
    }
  }

  // Obtener el valor actual (para el interceptor)
  getTenant(): string {
    return this.tenantSlug();
  }

  // Cambiar de empresa (desde el Login)
  setTenant(slug: string) {
    this.tenantSlug.set(slug);
    localStorage.setItem('selected_tenant', slug); // Persistir
  }
}