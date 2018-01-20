import { combineReducers } from 'redux';
import { IResumeState } from '../models';
import { resumeReducer } from './Resume';
import { IAuthState, userReducer } from './Auth';

export interface IState {
  resume: IResumeState;
  auth: IAuthState;
}

export const state = combineReducers<IState>({
  resume: resumeReducer,
  auth: userReducer
});
