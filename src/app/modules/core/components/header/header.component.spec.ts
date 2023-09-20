import { HeaderComponent } from './header.component';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { IState } from '../../../../store';

function setup<T>(): {
  default: () => any;
  build: () => T;
  store: MockStore<IState>;
  [key: string]: any;
} {
  const initialState = { isLoading: false, pokemons: [], pokemonId: null } as unknown as IState;
  const store: MockStore<IState> = getMockStore({ initialState });
  const builder = {
    store,
    default(): any {
      return builder;
    },
    build(): any {
      return new HeaderComponent(store);
    },
  };
  return builder;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  const { build } = setup<HeaderComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
