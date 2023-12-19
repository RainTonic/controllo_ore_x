import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { ROLE, UserReadDto } from '@api-interfaces';
import { AuthService } from '@app/_core/services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const loggedUser: UserReadDto | undefined = authService.loggedInUser;

  if (!loggedUser) {
    return false;
  }

  const permittedRoles: ROLE[] = route.data['roles'];

  // check if at least one permission is setted
  if (!permittedRoles || permittedRoles.length === 0) {
    return true;
  }

  // check if the requested permission is in the logged user role
  return permittedRoles.some((role: ROLE) => role === loggedUser.role?.name);
};
