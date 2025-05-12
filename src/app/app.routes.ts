import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PrivacidadComponent} from './privacidad/privacidad.component';
import {TerminosComponent} from './terminos/terminos.component';
import {NotfoundComponent} from './notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'pop',
    component: PrivacidadComponent,
  },
  {
    path: 'tos',
    component: TerminosComponent,
  },
  //  Soon !!
  // {
  //   path: 'news',
  //   component: HomeComponent,
  // },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
