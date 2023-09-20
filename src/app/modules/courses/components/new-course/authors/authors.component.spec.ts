import { AuthorsComponent } from './authors.component';
import { autoSpy, SpyOf } from '../../../../../utils/auto-spy';
import { AuthorsService } from '../../../../../services/authors.service';

function setup<T>(): { default: () => any; build: () => T; [key: string]: any } {
  const authorsService: SpyOf<AuthorsService> = autoSpy(AuthorsService);
  const builder = {
    default(): any {
      return builder;
    },
    build(): any {
      return new AuthorsComponent(authorsService);
    },
  };
  return builder;
}

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  const { build } = setup<AuthorsComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
