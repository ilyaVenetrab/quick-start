import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  email = '';

  password = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onLogin(): void {
    this.authService.login({
      email: this.email,
      password: this.password,
      token: Math.floor(Math.random() * (1000000 - 1) + 1),
    });
  }
}
