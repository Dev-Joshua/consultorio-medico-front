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
        path: 'dashboarrd',
        loadComponent: () => import('./business/dashboard/dashboard.component'),
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
    ],
  },
];
