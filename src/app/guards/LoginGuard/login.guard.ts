import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/TokenService/token-service.service';

export const loginGuard: CanActivateFn = (route, state) => {
  debugger;
  const router = inject(Router);
  const tokenService = inject(TokenService);
  if (!tokenService.isLoggin()) return true;
  router.navigate(['']);
  return false;
};
