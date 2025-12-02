import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

import { WorkInProgress } from './shared/components/layout/work-in-progress/work-in-progress';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login) 
  },
 // --- NUEVA RUTA: REGISTRO PÚBLICO ---
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },


  {
    path: 'home',

    canActivate: [authGuard], 
    loadComponent: () => import('./features/dashboard/home/home').then(m => m.Home),
    children: [
      // 1. INICIO
      { 
        path: '', 
        loadComponent: () => import('./features/dashboard/views/dashboard-view/dashboard-view').then(m => m.DashboardView) 
      },
      

      // 2. ADMINISTRACIÓN (Rutas futuras)
      { path: 'admin/nomina', component: WorkInProgress },
      { path: 'admin/asistencia', component: WorkInProgress },
      { path: 'admin/documental', component: WorkInProgress },

      // 3. ORGANIZACIÓN
      { path: 'org/estructura', component: WorkInProgress },
      { path: 'org/cargos', component: WorkInProgress },
      { path: 'org/organigrama', component: WorkInProgress},

      // 4. EVALUACIÓN
      { path: 'talento/evaluaciones', component: WorkInProgress},
      { path: 'talento/capacitaciones', component: WorkInProgress },
      { path: 'talento/encuestas', component: WorkInProgress },

      // 5. PORTAL COLABORADOR
      { 
        path: 'portal/perfil', // 5.1 Mis Datos
        loadComponent: () => import('./features/portal/profile/profile').then(m => m.Profile) 
      },
      { 
  path: 'portal/solicitudes', 
  loadComponent: () => import('./features/portal/requests/requests').then(m => m.Requests) 
},
      { path: 'portal/boletas', component: WorkInProgress },

      // 6. CONFIGURACIÓN
      { path: 'settings/roles', component: WorkInProgress },
      { path: 'settings/parametros', component: WorkInProgress },
      { path: 'settings/integraciones', component: WorkInProgress},
    ]
  },
  { path: '**', redirectTo: 'login' }
];