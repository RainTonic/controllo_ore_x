import { Route } from '@angular/router';
import { authGuard } from '@app/_core/guards/auth.guard';
import { unauthGuard } from '@app/_core/guards/unauth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: (): any =>
      import('./modules/unauth/unauth.module').then(
        (module) => module.UnauthModule,
      ),
    canActivate: [unauthGuard],
  },
  {
    path: 'auth',
    loadChildren: (): any =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
];
