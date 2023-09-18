import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserInfo } from '../../../../models/user';
import { selectAuth } from '../../../../store/auth/selectors/auth.selectors';
import { IState } from '../../../../store';
import { Store } from '@ngrx/store';
import { logOut } from '../../../../store/auth/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  user$: Observable<IUserInfo | null> = this.store.select(selectAuth);

  constructor(private readonly store: Store<IState>) {}

  logout(): void {
    this.store.dispatch(logOut());
  }
}
