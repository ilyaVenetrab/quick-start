import { NewCourseComponent } from './new-course.component';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { ICourseState } from '../../../../store/courses/reducers/courses.reducer';
import { autoSpy, SpyOf } from '../../../../utils/auto-spy';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

function setup<T>(): {
  default: () => any;
  build: () => T;
  store: MockStore<ICourseState>;
  [key: string]: any;
} {
  const initialState = {
    isLoading: false,
    courses: [],
  } as unknown as ICourseState;
  const store: MockStore<ICourseState> = getMockStore({ initialState });
  const activatedRoute: SpyOf<ActivatedRoute> = autoSpy(ActivatedRoute);
  const formBuilder: SpyOf<FormBuilder> = autoSpy(FormBuilder);
  let router: Router;
  const builder = {
    store,
    default(): any {
      return builder;
    },
    build(): any {
      return new NewCourseComponent(activatedRoute, router, formBuilder, store);
    },
  };
  return builder;
}

describe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  const { build } = setup<NewCourseComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
