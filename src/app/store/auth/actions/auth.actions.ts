import { createAction, props } from '@ngrx/store';
import { IUserInfo } from '../../../models/user';

export const getAuth = createAction('[Auth] Get Auth');

export const getAuthSuccess = createAction('[Auth] Get Auth Success', props<{ data: IUserInfo }>());

export const getAuthFailure = createAction('[Auth] Get Auth Failure', props<{ error: any }>());

export const logOut = createAction('[Auth] logOut');

export const logOutSuccess = createAction('[Auth] logOut Success', props<{ data: null }>());

export const logOutFailure = createAction('[Auth] logOut Failure', props<{ error: any }>());
