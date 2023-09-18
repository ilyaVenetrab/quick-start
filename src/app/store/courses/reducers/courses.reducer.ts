import { createReducer, on } from '@ngrx/store';
import { ICourse } from '../../../models/course';
import * as fromCoursesAction from '../actions/courses.actions';

export const coursesFeatureKey = 'courses';

export interface ICourseState {
  isLoading: boolean;
  courses: ICourse[];
}

export const initialState: ICourseState = {
  isLoading: false,
  courses: [],
};

export const reducer = createReducer(
  initialState,
  on(
    fromCoursesAction.getCourses,
    fromCoursesAction.deleteCourse,
    fromCoursesAction.updateCourse,
    (state) => {
      return { ...state, isLoading: true };
    },
  ),
  on(fromCoursesAction.getCoursesSuccess, (state, { data }) => {
    return { ...state, isLoading: false, courses: data };
  }),
  on(fromCoursesAction.getCoursesFailure, fromCoursesAction.deleteCourseFailure, (state) => {
    return { ...state, isLoading: false };
  }),
);
