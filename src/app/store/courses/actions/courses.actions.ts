import { createAction, props } from '@ngrx/store';
import { ICourse } from '../../../models/course';

export const getCourses = createAction(
  '[Courses] Get Courses',
  props<{ limit?: number; search?: string }>(),
);

export const getCoursesSuccess = createAction(
  '[Courses] Get Courses Success',
  props<{ data: ICourse[] }>(),
);

export const getCoursesFailure = createAction(
  '[Courses] Get Courses Failure',
  props<{ error: any }>(),
);

export const deleteCourse = createAction('[Courses] Delete Courses', props<{ id: number }>());

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: any }>(),
);

export const updateCourse = createAction('[Courses] Update Courses', props<{ course: ICourse }>());

export const updateCourseSuccess = createAction('[Courses] Update Courses Success');

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: any }>(),
);

export const saveCourse = createAction('[Courses] Save Courses', props<{ course: ICourse }>());

export const saveCourseSuccess = createAction('[Courses] Save Courses Success');

export const saveCourseFailure = createAction(
  '[Courses] Save Course Failure',
  props<{ error: any }>(),
);
