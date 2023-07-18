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

  error = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onLogin(): void {
    this.error = false;

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (users) => {
          this.error = !users;
        },
      });
  }
}
