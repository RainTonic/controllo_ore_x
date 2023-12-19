import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const unauthGuard: CanActivateFn = async () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  try {
    if (authService.loggedInUser) {
      return router.createUrlTree(['auth']);
    }

    return true;
  } catch (error) {
    return true;
  }
};
