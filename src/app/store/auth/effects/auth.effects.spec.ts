import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../../services/auth/auth.service';
import { autoSpy, SpyOf } from '../../../utils/auto-spy';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  const authService: SpyOf<AuthService> = autoSpy(AuthService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
