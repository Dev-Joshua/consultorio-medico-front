import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component'),
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component'),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./business/dashboard/pages/dashboard.component'),
      },
      {
        path: 'citas',
        loadComponent: () => import('./business/citas/citas.component'),
      },
      {
        path: 'pacientes',
        loadComponent: () => import('./business/pacientes/pacientes.component'),
      },
      {
        path: 'medicos',
        loadComponent: () => import('./business/medicos/medicos.component'),
      },
      {
        path: 'especialidades',
        loadComponent: () =>
          import('./business/especialidades/especialidades.component'),
      },
      {
        path: 'historial',
        loadComponent: () => import('./business/historial/historial.component'),
      },
      {
        path: 'pacientes/editar/:id',
        loadComponent: () =>
          import(
            './business/pacientes/form-update-paciente/form-update-paciente.component'
          ),
      },
      {
        path: 'medicos/editar/:id',
        loadComponent: () =>
          import(
            './business/medicos/form-update-medico/form-update-medico.component'
          ),
      },
      {
        path: 'consultas/editar/:id',
        loadComponent: () =>
          import(
            './business/citas/form-update-citas/form-update-citas.component'
          ),
      },
    ],
  },
];
