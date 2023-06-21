import { Injectable } from '@angular/core';
import { IUserLogin } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  static readonly STORAGE_KEY = 'user';

  login(data: IUserLogin): void {
    localStorage.setItem(AuthService.STORAGE_KEY, JSON.stringify({ ...data }));
    this.router.navigate(['/']);
  }

  logout(): void {
    console.log('getUserInfo => ', this.getUserInfo());
    localStorage.removeItem(AuthService.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.STORAGE_KEY);
  }

  getUserInfo(): string {
    const { email } = JSON.parse(localStorage.getItem(AuthService.STORAGE_KEY) || '');
    return email;
  }
}
