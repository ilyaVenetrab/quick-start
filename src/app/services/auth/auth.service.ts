import { EventEmitter, Injectable, Output } from '@angular/core';
import { IUser, IUserInfo } from '../../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() getLogin: EventEmitter<IUserInfo | null> = new EventEmitter();

  static readonly STORAGE_KEY = 'user';

  constructor(private router: Router, private readonly httpClient: HttpClient) {}

  login(data: IUser): Observable<IUserInfo | null> {
    return this.httpClient
      .get<IUserInfo[]>(`/users?email=${data.email}&password=${data.password}`)
      .pipe(
        map((user) => {
          if (!!user.length) {
            localStorage.setItem(AuthService.STORAGE_KEY, user[0].token);
            this.router.navigate(['/']);

            this.getLogin.emit(user[0]);
            return user[0];
          }

          return null;
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(AuthService.STORAGE_KEY);
    this.router.navigate(['/login']);
    this.getLogin.emit(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.STORAGE_KEY);
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.httpClient
      .get<IUserInfo[]>(`/users?token_like=${localStorage.getItem(AuthService.STORAGE_KEY)}`)
      .pipe(
        map((users) => {
          this.getLogin.emit(users[0]);
          return users[0];
        }),
      );
  }
}
