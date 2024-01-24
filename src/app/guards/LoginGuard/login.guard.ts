import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/TokenService/token-service.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  if (!tokenService.isLoggin()) return true;
  tokenService.logout();
  router.navigate(['/login']);
  return false;
};
