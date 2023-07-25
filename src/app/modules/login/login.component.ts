import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin(form: NgForm): void {
    const { email, password } = form.value;

    this.authService
      .login({
        email,
        password,
      })
      .subscribe({
        next: (users) => console.log(users),
      });
  }
}
