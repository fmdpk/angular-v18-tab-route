import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  //       outlet: 'Dashboard'
  //     },
  //     // {
  //     //   path: 'dashboard/:id',
  //     //   loadComponent: () => import('./dashboard/components/dashboard-detail/dashboard-detail.component').then(m => m.DashboardDetailComponent),
  //     //   outlet: 'Dashboard'
  //     // },
  //     {
  //       path: 'users',
  //       loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
  //       outlet: 'Users'
  //     },
  //     {
  //       path: 'products',
  //       loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
  //       outlet: 'Products'
  //     },
  //     {
  //       path: 'settings',
  //       loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
  //       outlet: 'Settings'
  //     },
  //   ]
  // },


  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    outlet: 'Dashboard'
  },
  // {
  //   path: 'dashboard/:id',
  //   loadComponent: () => import('./dashboard/components/dashboard-detail/dashboard-detail.component').then(m => m.DashboardDetailComponent),
  //   outlet: 'DashboardDetail'
  // },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    outlet: 'Users'
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    outlet: 'Products'
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
    outlet: 'Settings'
  },
  // {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];
