import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/anasayfa/anasayfa').then(m => m.Anasayfa) },
  { path: 'hakkimizda', loadComponent: () => import('./pages/hakkimizda/hakkimizda').then(m => m.Hakkimizda) },
  { path: 'hizmetlerimiz', loadComponent: () => import('./pages/hizmetlerimiz/hizmetlerimiz').then(m => m.Hizmetlerimiz) },
  { path: 'galeri', loadComponent: () => import('./pages/galeri/galeri').then(m => m.Galeri) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then(m => m.Blog) },
  { path: 'iletisim', loadComponent: () => import('./pages/iletisim/iletisim').then(m => m.Iletisim) },
  { path: 'blog/yeni', canActivate: [authGuard], loadComponent: () => import('./components/add-post/add-post').then(m => m.AddPost) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog-yazisi/blog-yazisi').then(m => m.BlogYazisi) },
  { path: 'duzenle/:id', canActivate: [authGuard], loadComponent: () => import('./components/edit-post/edit-post').then(m => m.EditPost) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: 'admin', canActivate: [authGuard], loadComponent: () => import('./admin/admin.component/admin.component').then(m => m.AdminComponent) }
];

