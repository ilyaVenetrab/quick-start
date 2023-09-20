import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CoursesEffects } from './courses.effects';
import { autoSpy, SpyOf } from '../../../utils/auto-spy';
import { CoursesService } from '../../../services/courses.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('CoursesEffects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;
  const coursesService: SpyOf<CoursesService> = autoSpy(CoursesService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
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
        }),
        {
          provide: CoursesService,
          useValue: coursesService,
        },
      ],
    });

    effects = TestBed.inject(CoursesEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
