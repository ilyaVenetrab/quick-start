import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const { url } = state;

    return of(this.authService.isAuthenticated()).pipe(
      switchMap((isLogin) => {
        if (!isLogin && url === '/login') {
          return of(true);
        }
        if (isLogin && url === '/login') {
          this.router.navigate(['/']);
          return of(false);
        }
        if (!isLogin) {
          this.router.navigate(['/login']);
        }
        return of(isLogin);
      }),
    );
  }
}
