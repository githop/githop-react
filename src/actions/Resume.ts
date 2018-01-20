import GithopBackend from '../lib/api-client';
import { Action, Dispatch } from 'redux';
import { CardAccomplishment, CardContent, IResumeState } from '../models';

export enum ResumeActionTypes {
  Load = '[Resume] Load',
  LoadSuccess = '[Resume] Load Success',
  UpdateCardRequest = '[Resume] Update card request',
  UpdateCardSuccess = '[Resume] Update card success',
  UpdateCardFailure = '[Resume] Update card failure',
  UpdateAccomplishmentRequest = '[Resume] Update Accomplishment request',
  UpdateAccomplishmentSuccess = '[Resume] Update Accomplishment success',
  UpdateAccomplishmentFailure = '[Resume] Update Accomplishment failure',
}

export class ResumeLoad {
  readonly type = ResumeActionTypes.Load;
}

export const AsyncResumeLoad = () => {
  return (dispatch: Dispatch<ResumeLoadSuccess>) => {
    GithopBackend.getResume()
        .then(resumeState => new ResumeLoadSuccess(resumeState))
        .then(resumeSuccessAction => dispatch(resumeSuccessAction.asObj));
  };
};

export const AsyncUpdateCard = (nc: CardContent) => {
  return async (dispatch: Dispatch<UpdateCardActions>) => {
    try {
      dispatch(new UpdateCardRequest().asObj);
      const newContents = await GithopBackend.updateCardContent(nc.key, nc);
      const updateAction = new UpdateCardSuccess(newContents);
      dispatch(updateAction.asObj);
    } catch (e) {
      dispatch(new UpdateCardFailure(e).asObj);
    }
  };
};

export const AsyncUpdateAccomplishment = (na: CardAccomplishment) => {
  return async (dispatch: Dispatch<UpdateCardActions>) => {
    try {
      dispatch(new UpdateAccomplishmentRequest().asObj);
      const accmpModel = await GithopBackend.updateAccomplishment(na.key, na);
      const updateAction = new UpdateAccomplishmentSuccess(accmpModel);
      dispatch(updateAction.asObj);
    } catch (e) {
      dispatch(new UpdateAccomplishmentFailure(e).asObj);
    }
  };
};

export class ResumeLoadSuccess implements Action {
  readonly type = ResumeActionTypes.LoadSuccess;
  constructor(public payload: IResumeState ) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class UpdateCardRequest implements Action {
  readonly type = ResumeActionTypes.UpdateCardRequest;
  get asObj() {
    return {
      type: this.type
    };
  }
}

export class UpdateCardSuccess implements Action {
  readonly type = ResumeActionTypes.UpdateCardSuccess;
  constructor(public payload: CardContent) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class UpdateCardFailure implements Action {
  readonly type = ResumeActionTypes.UpdateCardFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class UpdateAccomplishmentRequest implements Action {
  readonly type = ResumeActionTypes.UpdateAccomplishmentRequest;
  get asObj() {
    return {
      type: this.type
    };
  }
}

export class UpdateAccomplishmentSuccess implements Action {
  readonly type = ResumeActionTypes.UpdateAccomplishmentSuccess;
  constructor(public payload: CardAccomplishment) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class UpdateAccomplishmentFailure implements Action {
  readonly type = ResumeActionTypes.UpdateAccomplishmentFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export type UpdateAccomplishmentActions = UpdateAccomplishmentRequest
    | UpdateAccomplishmentSuccess
    | UpdateAccomplishmentFailure;

export type UpdateCardActions = UpdateCardRequest
    | UpdateCardSuccess
    | UpdateCardFailure;

export type ResumeActions = ResumeLoad
    | ResumeLoadSuccess
    | UpdateCardActions
    | UpdateAccomplishmentActions;
