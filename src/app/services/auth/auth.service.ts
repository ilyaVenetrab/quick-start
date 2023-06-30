import { Injectable } from '@angular/core';
import { IUser, IUserInfo } from '../../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private readonly httpClient: HttpClient) {}

  static readonly STORAGE_KEY = 'user';

  login(data: IUser): Observable<IUserInfo | null> {
    return this.httpClient
      .get<IUserInfo[]>(`/users?email=${data.email}&password=${data.password}`)
      .pipe(
        // filter((user) => !!user.length),
        map((user) => {
          if (!!user.length) {
            localStorage.setItem(AuthService.STORAGE_KEY, user[0].token);
            this.router.navigate(['/']);

            return user[0];
          }

          return null;
        }),
      );
  }

  logout(): void {
    this.getUserInfo().subscribe((user) => {
      console.log('getUserInfo ===> ', user);
      localStorage.removeItem(AuthService.STORAGE_KEY);
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.STORAGE_KEY);
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.httpClient.get<IUserInfo>(
      `/users?token_like=${localStorage.getItem(AuthService.STORAGE_KEY)}`,
    );
  }
}
