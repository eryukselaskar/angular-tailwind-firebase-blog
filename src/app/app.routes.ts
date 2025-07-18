import { Routes } from '@angular/router';
import { Anasayfa } from './pages/anasayfa/anasayfa';
import { Hakkimizda } from './pages/hakkimizda/hakkimizda';
import { Hizmetlerimiz } from './pages/hizmetlerimiz/hizmetlerimiz';
import { Galeri } from './pages/galeri/galeri';
import { Blog } from './pages/blog/blog';
import { Iletisim } from './pages/iletisim/iletisim';
import { AddPost } from './components/add-post/add-post';
import { BlogYazisi } from './pages/blog-yazisi/blog-yazisi';

export const routes: Routes = [
  { path: '', component: Anasayfa },
  { path: 'hakkimizda', component: Hakkimizda },
  { path: 'hizmetlerimiz', component: Hizmetlerimiz },
  { path: 'galeri', component: Galeri },
  { path: 'blog', component: Blog },
  { path: 'iletisim', component: Iletisim },
  { path: 'yazi-ekle', component: AddPost },
  { path: 'blog/:slug', component: BlogYazisi },
  {
    path: 'duzenle/:id',
    loadComponent: () =>
      import('./components/edit-post/edit-post').then((m) => m.EditPost),
  },
  {
    path: 'sil/:id',
    loadComponent: () =>
      import('./components/delete-post/delete-post').then((m) => m.DeletePost),
  }

];
