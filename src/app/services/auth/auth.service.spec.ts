import { AuthService } from './auth.service';
import { autoSpy, SpyOf } from '../../utils/auto-spy';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { IState } from '../../store';

function setup<T>(): {
  default: () => any;
  build: () => T;
  httpClient: SpyOf<HttpClient>;
  [key: string]: any;
} {
  const initialState = {
    auth: {
      userInfo: {
        token: '442738TC23',
        fullName: 'Бильбо Бэггинс',
      },
      isLoading: false,
    },
    courses: {
      isLoading: false,
      courses: [
        {
          id: 1,
          title: 'Test Course',
          creationData: new Date(),
          duration: 100,
          description: 'Test description',
          topRated: true,
        },
      ],
    },
    router: {} as any,
  } as unknown as IState;
  const httpClient: SpyOf<HttpClient> = autoSpy(HttpClient);
  const store: MockStore<IState> = getMockStore({ initialState });
  let router: Router;
  const builder = {
    httpClient,
    default(): any {
      return builder;
    },
    build(): any {
      return new AuthService(router, httpClient, store);
    },
  };
  return builder;
}
describe('AuthService', () => {
  let service: AuthService;
  const { build } = setup<AuthService>();

  beforeEach(() => {
    service = build();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
