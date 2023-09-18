import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from '../reducers/courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.ICourseState>(
  fromCourses.coursesFeatureKey,
);

export const selectIsCoursesLoading = createSelector(
  selectCoursesState,
  (state) => state.isLoading,
);

export const selectCourses = createSelector(selectCoursesState, (state) => state.courses);

export const selectCoursesCount = createSelector(selectCourses, (courses) => courses.length);
