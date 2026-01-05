import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // <--- IMPORTANTE
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// 👇 1. IMPORTAR ESTO
import { provideNativeDateAdapter } from '@angular/material/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { routes } from './app.routes';
// 1. IMPORTAR ESTO

// --- IMPORTS DE MSAL (MICROSOFT) ---
import { 
  MsalService, 
  MsalBroadcastService, 
  MSAL_INSTANCE, 
  MsalGuard
} from '@azure/msal-angular';

import { MSALInstanceFactory } from './core/config/msal.config';

// INTERCEPTORS

import { tenantInterceptor } from './core/interceptors/tenant.interceptor'; // <--- 1. IMPORTAR


export function MSALInitializerFactory(msalService: MsalService) {
  return () => msalService.instance.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    
    // 2. REGISTRAR AQUÍ EL INTERCEPTOR
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tenantInterceptor, // <--- PRIMERO: Identifica la empresa (slug)
        authInterceptor    // <--- SEGUNDO: Pone el token (si existe)
      ]) 
    ),

    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory 
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard,

    {
      provide: APP_INITIALIZER,
      useFactory: MSALInitializerFactory,
      deps: [MsalService],
      multi: true
    }
  ]
};