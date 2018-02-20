import { combineReducers } from 'redux';
import { IResumeState } from '../models';
import { resumeReducer } from './Resume';
import { IAuthState, userReducer } from './Auth';
import { ITooltipState, tooltipReducer } from './Tooltip';

export interface IState {
  resume: IResumeState;
  auth: IAuthState;
  tooltip: ITooltipState;
}

export const state = combineReducers<IState>({
  resume: resumeReducer,
  auth: userReducer,
  tooltip: tooltipReducer
});
