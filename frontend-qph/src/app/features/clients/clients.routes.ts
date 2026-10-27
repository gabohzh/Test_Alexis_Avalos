import { Routes } from '@angular/router';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./client-list/client-list').then(m => m.ClientListComponent)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./client-form/client-form').then(m => m.ClientFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./client-form/client-form').then(m => m.ClientFormComponent)
  }
];