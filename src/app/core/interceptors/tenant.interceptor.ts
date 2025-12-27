import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from '../services/tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Inyectamos el servicio
  const tenantService = inject(TenantService);
  
  // Obtenemos el slug configurado actualmente (Techgans, Conexa, Demo...)
  const slug = tenantService.getTenant();

  const tenantReq = req.clone({
    headers: req.headers.set('x-tenant-slug', slug)
  });

  return next(tenantReq);
};