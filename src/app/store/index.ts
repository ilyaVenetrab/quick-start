import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as formAuth from './auth/reducers/auth.reducer';
import * as formCourses from './courses/reducers/courses.reducer';
import * as fromRouter from '@ngrx/router-store';

export interface IState {
  [formAuth.authFeatureKey]: formAuth.IState;
  [formCourses.coursesFeatureKey]: formCourses.ICourseState;
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<IState> = {
  [formAuth.authFeatureKey]: formAuth.reducer,
  [formCourses.coursesFeatureKey]: formCourses.reducer,
  router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<IState>[] = isDevMode() ? [] : [];
