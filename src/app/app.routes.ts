import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./parent/parent').then((m) => m.Parent),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./parent/parent').then((m) => m.Parent),
  },
  { path: '**', redirectTo: '' },
];
