import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const requiredRole = route.data['role'] as string;
    const currentUser = authService.currentUser();

    if (currentUser && currentUser.role === requiredRole) {
        return true;
    }

    // Redirect to appropriate dashboard based on user role
    if (currentUser) {
        router.navigate([`/${currentUser.role}/dashboard`]);
    } else {
        router.navigate(['/login']);
    }

    return false;
};
