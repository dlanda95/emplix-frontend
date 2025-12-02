import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

/**
 * AUTH GUARD (El Portero)
 * Protege las rutas para que solo usuarios autenticados puedan pasar.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Preguntamos al servicio si el usuario es válido
  if (authService.isAuthenticated()) {
    return true; // ¡Pase usted!
  }

  // 2. Si no está logueado, lo mandamos al Login
  // Tip Pro: Podríamos guardar la URL 'state.url' para redirigirlo allí después del login
  console.warn('🚧 Acceso denegado: Usuario no autenticado');
  return router.createUrlTree(['/login']);
};