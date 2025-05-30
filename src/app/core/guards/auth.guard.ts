import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth/authservice.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);

  // Avoid accessing localStorage during SSR
  const isBrowser = isPlatformBrowser(platformId);
  if (!isBrowser) {
    return false;
  }

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
