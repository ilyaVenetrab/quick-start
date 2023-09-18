import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCoursesAction from '../../courses/actions/courses.actions';
import { catchError, map, of, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { CoursesService } from '../../../services/courses.service';
import { Store } from '@ngrx/store';
import { ICourseState } from '../reducers/courses.reducer';
import { selectCoursesCount } from '../selectors/courses.selectors';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects implements OnDestroy {
  private readonly destroy$ = new EventEmitter<void>();

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<ICourseState>,
    private router: Router,
  ) {}

  getCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesAction.getCourses),
      withLatestFrom(this.store.select(selectCoursesCount)),
      switchMap(([{ limit, search }, count]) =>
        this.coursesService.getList(limit || count + 10, search).pipe(
          map((data) => fromCoursesAction.getCoursesSuccess({ data })),
          catchError((error) => of(fromCoursesAction.getCoursesFailure({ error }))),
        ),
      ),
    ),
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesAction.deleteCourse),
      switchMap(({ id }) =>
        this.coursesService.removeItem(id).pipe(
          withLatestFrom(this.store.select(selectCoursesCount)),
          map((_, limit) => fromCoursesAction.getCourses({ limit })),
          catchError((error) => of(fromCoursesAction.deleteCourseFailure({ error }))),
        ),
      ),
    ),
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesAction.updateCourse),
      switchMap(({ course }) =>
        this.coursesService.updateItem(course).pipe(
          withLatestFrom(this.store.select(selectCoursesCount)),
          map((_) => fromCoursesAction.updateCourseSuccess()),
          catchError((error) => of(fromCoursesAction.updateCourseFailure({ error }))),
        ),
      ),
    ),
  );

  saveCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesAction.saveCourse),
      switchMap(({ course }) =>
        this.coursesService.saveItem(course).pipe(
          map((_) => fromCoursesAction.saveCourseSuccess()),
          catchError((error) => of(fromCoursesAction.saveCourseFailure({ error }))),
        ),
      ),
    ),
  );

  updateCourseSuccess$ = this.actions$
    .pipe(ofType(fromCoursesAction.updateCourseSuccess), takeUntil(this.destroy$))
    .subscribe(() => this.router.navigateByUrl('/courses'));

  saveCourseSuccess$ = this.actions$
    .pipe(ofType(fromCoursesAction.saveCourseSuccess), takeUntil(this.destroy$))
    .subscribe(() => this.router.navigateByUrl('/courses'));

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
