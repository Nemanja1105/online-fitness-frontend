import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../services/TokenService/token-service.service';

export const mainGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  if (!tokenService.isLoggin()) return true;
  router.navigate(['']);
  return false;
};
