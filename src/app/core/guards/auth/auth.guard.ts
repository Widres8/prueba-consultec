import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';

export const AuthGuard = async () => {
  const router = inject(Router);
  const service = inject(AuthService);
  const result = await service.isAuthenticate();
  return !result ? router.navigate(['/login']) : true;
};
