import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Auth durumu yüklenene kadar bekle
  await firstValueFrom(authService.isLoaded$.pipe(filter(loaded => loaded)));

  const user = authService.getCurrentUser();

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
