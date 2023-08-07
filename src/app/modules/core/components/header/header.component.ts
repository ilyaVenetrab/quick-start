import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { IUserInfo } from '../../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  user$: Observable<IUserInfo | null> = this.authService.getLogin;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
