import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthReducers from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuthReducers.IState>(
  fromAuthReducers.authFeatureKey,
);

export const selectLoading = createSelector(selectAuthState, (state) => {
  return state.isLoading;
});

export const selectAuth = createSelector(selectAuthState, (state) => {
  return state.userInfo;
});
