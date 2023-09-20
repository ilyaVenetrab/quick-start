import { CoursesService } from './courses.service';
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
      return new CoursesService(httpClient);
    },
  };
  return builder;
}

describe('CoursesService', () => {
  let service: CoursesService;
  const { build } = setup<CoursesService>();

  beforeEach(() => {
    service = build();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
