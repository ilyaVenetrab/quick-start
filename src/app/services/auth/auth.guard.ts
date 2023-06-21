import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    const { url } = state;

    return of(this.authService.isAuthenticated()).pipe(
      switchMap((isLogin) => {
        if (!isLogin && url === '/login') {
          return of(true);
        }
        if (isLogin && url === '/login') {
          return of(this.router.createUrlTree(['/']));
        }
        if (!isLogin) {
          return of(this.router.createUrlTree(['/login']));
        }
        return of(isLogin);
      }),
    );
  }
}
