import { IResumeState } from '../models/Resume';
import GithopBackend from '../api';
import { Dispatch } from 'redux';

export enum ResumeActionTypes {
  Load = '[Resume] Load',
  LoadSuccess = '[Resume] Load Success'
}

export class ResumeLoad {
  readonly type = ResumeActionTypes.Load;
}

export const AsyncResumeLoad = () => {
  return (dispatch: Dispatch<ResumeLoadSuccess>) => {
    GithopBackend.getResume()
        .then(resumeState => new ResumeLoadSuccess(resumeState))
        .then(resumeSuccessAction => dispatch(resumeSuccessAction.action));
  };
};

export class ResumeLoadSuccess {
  readonly type = ResumeActionTypes.LoadSuccess;
  constructor(public payload: IResumeState ) {}
  get action() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export type ResumeActions = ResumeLoad | ResumeLoadSuccess;