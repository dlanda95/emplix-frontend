import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // <--- IMPORTANTE
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { routes } from './app.routes';


// MSAL IMPORTS
// --- IMPORTS DE MSAL (MICROSOFT) ---
import { 
  MsalService, 
  MsalBroadcastService, 
  MSAL_INSTANCE, 
  MsalGuard
} from '@azure/msal-angular';

import { MSALInstanceFactory } from './core/config/msal.config';


export function MSALInitializerFactory(msalService: MsalService) {
  return () => msalService.instance.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // Habilitamos el cliente HTTP moderno (Fetch API)
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) 
  ) ,
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