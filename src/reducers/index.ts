import { combineReducers } from 'redux';
import { IResumeState } from '../models/Resume';
import { resumeReducer } from './Resume';

export interface IState {
  resume: IResumeState;
}

export const state = combineReducers<IState>({
  resume: resumeReducer
});
