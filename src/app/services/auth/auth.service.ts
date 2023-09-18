import { Injectable } from '@angular/core';
import { IUser, IUserInfo } from '../../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../../store';
import { getAuthSuccess } from '../../store/auth/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly STORAGE_KEY = 'user';

  constructor(
    private router: Router,
    private readonly httpClient: HttpClient,
    private readonly store: Store<IState>,
  ) {}

  login(data: IUser): Observable<IUserInfo | null> {
    return this.httpClient
      .get<IUserInfo[]>(`/users?email=${data.email}&password=${data.password}`)
      .pipe(
        map((user) => {
          if (!!user.length) {
            localStorage.setItem(AuthService.STORAGE_KEY, user[0].token);
            this.store.dispatch(getAuthSuccess({ data: user[0] }));
            this.router.navigate(['/']);
            return user[0];
          }

          return null;
        }),
      );
  }

  logout(): Observable<null> {
    return of(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.STORAGE_KEY);
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.httpClient
      .get<IUserInfo[]>(`/users?token_like=${localStorage.getItem(AuthService.STORAGE_KEY)}`)
      .pipe(map((users) => users[0]));
  }
}
