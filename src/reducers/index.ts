import { combineReducers } from 'redux';
import { IResumeState } from '../models';
import { IAuthState, userReducer } from './Auth';
import { resumeReducer } from './Resume';
import { ITooltipState, tooltipReducer } from './Tooltip';

export interface IState {
  resume: IResumeState;
  auth: IAuthState;
  tooltip: ITooltipState;
}

export const state = combineReducers<IState>({
  resume: resumeReducer,
  auth: userReducer,
  tooltip: tooltipReducer,
});
