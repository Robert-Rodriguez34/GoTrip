
import type { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./services/services.page').then(m => m.ServicesPage)
  },

  {
    path: 'booking',
    loadComponent: () =>
      import('./booking/booking.page').then(m => m.BookingPage)
  },

  {
    path: 'confirmation',
    loadComponent: () =>
      import('./confirmation/confirmation.page').then(m => m.ConfirmationPage)
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then(m => m.ProfilePage)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
