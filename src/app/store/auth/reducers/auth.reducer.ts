import { createReducer, on } from '@ngrx/store';
import { IUserInfo } from '../../../models/user';
import * as fromAuthAction from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface IState {
  userInfo: IUserInfo | null;
  isLoading: boolean;
}

export const initialState: IState = {
  userInfo: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(fromAuthAction.getAuth, (state: IState) => {
    return { ...state, userInfo: null, isLoading: true };
  }),
  on(fromAuthAction.getAuthSuccess, (state: IState, { data }) => {
    return { ...state, userInfo: data, isLoading: false };
  }),
  on(fromAuthAction.getAuthFailure, (state: IState) => {
    return { ...state, userInfo: null, isLoading: false };
  }),
  on(fromAuthAction.logOut, (state: IState) => {
    return { ...state, userInfo: null, isLoading: true };
  }),
  on(fromAuthAction.logOutSuccess, (state: IState, { data }) => {
    return { ...state, userInfo: data, isLoading: false };
  }),
  on(fromAuthAction.logOutFailure, (state: IState) => {
    return { ...state, userInfo: null, isLoading: false };
  }),
);
