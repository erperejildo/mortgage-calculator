import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mortgage-form',
    loadChildren: () =>
      import('./mortgage-form/mortgage-form.module').then(
        (m) => m.MortgageFormModule
      ),
  },
  {
    path: 'mortgage-result',
    loadChildren: () =>
      import('./mortgage-result/mortgage-result.module').then(
        (m) => m.MortgageResultModule
      ),
  },
  {
    path: '',
    redirectTo: '/mortgage-form',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/mortgage-form',
  },
];
