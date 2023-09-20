import { CourseListComponent } from './course-list.component';
import { autoSpy, SpyOf } from '../../../../utils/auto-spy';
import { ConfirmationService } from 'primeng/api';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import { ICourseState } from '../../../../store/courses/reducers/courses.reducer';
import { Router } from '@angular/router';

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
  const confirmationService: SpyOf<ConfirmationService> = autoSpy(ConfirmationService);
  let router: Router;
  const builder = {
    store,
    default(): any {
      return builder;
    },
    build(): any {
      return new CourseListComponent(confirmationService, store, router);
    },
  };
  return builder;
}
describe('CourseListComponent', () => {
  let component: CourseListComponent;
  const { build } = setup<CourseListComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
