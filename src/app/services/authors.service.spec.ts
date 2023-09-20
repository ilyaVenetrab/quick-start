import { AuthorsService } from './authors.service';
import { autoSpy, SpyOf } from '../utils/auto-spy';
import { HttpClient } from '@angular/common/http';

function setup<T>(): {
  default: () => any;
  build: () => T;
  httpClient: SpyOf<HttpClient>;
  [key: string]: any;
} {
  const httpClient: SpyOf<HttpClient> = autoSpy(HttpClient);
  const builder = {
    httpClient,
    default(): any {
      return builder;
    },
    build(): any {
      return new AuthorsService(httpClient);
    },
  };
  return builder;
}

describe('AuthorsService', () => {
  let service: AuthorsService;
  const { build } = setup<AuthorsService>();

  beforeEach(() => {
    service = build();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
