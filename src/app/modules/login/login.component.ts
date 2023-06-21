import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

/*export interface ILoginForm {
  email: FormControl;
  password: FormControl;
}*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  /*loginForm: FormGroup<ILoginForm> = this.fb.group<ILoginForm>({
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });*/

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
