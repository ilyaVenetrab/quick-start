import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthAction from '../actions/auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.getAuth),
      switchMap(() => this.authService.getUserInfo()),
      map((data) => fromAuthAction.getAuthSuccess({ data })),
      catchError((error) => of(fromAuthAction.getAuthFailure({ error }))),
    ),
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.logOut),
      map(() => null),
      map((data) => fromAuthAction.logOutSuccess({ data })),
      catchError((error) => of(fromAuthAction.logOutFailure({ error }))),
    ),
  );
}
