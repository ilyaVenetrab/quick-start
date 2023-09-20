import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../../store/auth/reducers/auth.reducer';
import { selectAuth } from '../../store/auth/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private readonly store: Store<IState>) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    // const { url } = state;

    return this.store.select(selectAuth).pipe(
      switchMap((user) => {
        if (!user) {
          return of(this.router.createUrlTree(['/login']));
        }
        return of(!!user);
      }),
    );
  }
}
