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
      {
        path: 'admin/asistencia',

        loadComponent: () => import('./features/admin/views/attendance-view/attendance-view').then(m => m.AttendanceView)
      },

      { path: 'admin/documental', component: WorkInProgress },
      {
        path: 'admin/solicitudes', // <--- Nueva Ruta
        loadComponent: () => import('./features/admin/request-approval/request-approval').then(m => m.RequestApproval)
      },

      // 3. ORGANIZACIÓN
      {
        path: 'org/estructura',
        // Esta es la vista de TARJETAS DE DEPARTAMENTOS que acabamos de crear.
        // Desde aquí se abren los modales para gestionar Cargos.
        loadComponent: () => import('./features/organization/views/structure-view/structure-view').then(m => m.OrgChartView)
      },
      {
        path: 'org/cargos',
        // CAMBIO AQUÍ: Conectamos la nueva vista de Cargos
        loadComponent: () => import('./features/organization/views/cargos-view/cargos-view').then(m => m.PositionsView)
      },
      {
        path: 'org/directorio', // <--- Nueva ruta para esta vista
        loadComponent: () => import('./features/organization/views/directory-view/directory-view').then(m => m.DirectoryView)
      },
      {
        path: 'org/organigrama', // <--- Actualizado
        loadComponent: () => import('./features/organization/views/organigram-view/organigram-view').then(m => m.OrganigramView)
      },

      // 4. EVALUACIÓN
      { path: 'talento/evaluaciones', component: WorkInProgress },
      { path: 'talento/capacitaciones', component: WorkInProgress },
      { path: 'talento/encuestas', component: WorkInProgress },

      // 5. PORTAL COLABORADOR
      {
        path: 'portal/perfil', // 5.1 Mis Datos
        loadComponent: () => import('./features/portal/profile/profile').then(m => m.Profile)
      },
      {
        path: 'portal/mi-asistencia',
        loadComponent: () => import('./features/portal/attendance/views/my-attendance-view/my-attendance-view').then(m => m.MyAttendanceView)
      },
      {
        path: 'portal/solicitudes',
        loadComponent: () => import('./features/portal/requests/requests').then(m => m.Requests)
      },
      { path: 'portal/boletas', component: WorkInProgress },
      {
        path: 'portal/documentos', // Nueva ruta
        loadComponent: () => import('./features/portal/documents/views/documents-view/documents-view').then(m => m.DocumentsView)
      },
      {
        path: 'portal/mi-equipo',
        loadComponent: () => import('./features/portal/team/views/my-team-view/my-team-view')
          .then(m => m.MyTeamView)
      },{
  path: 'portal/mis-activos',
  loadComponent: () => import('./features/portal/assets/views/my-assets-view/my-assets-view').then(m => m.MyAssetsView)
},
{
  path: 'portal/fotocheck',
  loadComponent: () => import('./features/portal/credential/views/credential-view/credential-view').then(m => m.CredentialView)
},

{
  path: 'portal/beneficios',
  loadComponent: () => import('./features/portal/benefits/views/benefits-view/benefits-view').then(m => m.BenefitsView)
},

      // 6. CONFIGURACIÓN
      { path: 'settings/roles', component: WorkInProgress },
      { path: 'settings/parametros', component: WorkInProgress },
      { path: 'settings/integraciones', component: WorkInProgress },
    ]
  },
  { path: '**', redirectTo: 'login' }
];