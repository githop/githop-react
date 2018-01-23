import GithopBackend from '../lib/api-client';
import { Action, Dispatch } from 'redux';
import { CardAccomplishment, CardContent, IResumeState } from '../models';

export enum ResumeActionTypes {
  Load = '[Resume] Load',
  LoadSuccess = '[Resume] Load success',
  LoadFailure = '[Resume] Load failure',
  UpdateCardRequest = '[Resume] Update card request',
  UpdateCardSuccess = '[Resume] Update card success',
  UpdateCardFailure = '[Resume] Update card failure',
  UpdateAccomplishmentRequest = '[Resume] Update Accomplishment request',
  UpdateAccomplishmentSuccess = '[Resume] Update Accomplishment success',
  UpdateAccomplishmentFailure = '[Resume] Update Accomplishment failure',
  AddAccomplishmentRequest = '[Resume] Add accomplishment request',
  AddAccomplishmentSuccess = '[Resume] Add accomplishment success',
  AddAccomplishmentFailure = '[Resume] Add accomplishment failure',
  DeleteAccomplishmentRequest = '[Resume] Delete accomplishment request',
  DeleteAccomplishmentSuccess = '[Resume] Delete accomplishment success',
  DeleteAccomplishmentFailure = '[Resume] Delete accomplishment failure',
}

export const AsyncResumeLoad = () => {
  return async (dispatch: Dispatch<ResumeActions>) => {
    try {
      dispatch(new ResumeLoad().asObj);
      const resumeModel = await GithopBackend.getResume();
      const resumeAction = new ResumeLoadSuccess(resumeModel);
      dispatch(resumeAction.asObj);
    } catch (e) {
      dispatch(new ResumeLoadFailure(e).asObj);
    }
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

export const AsyncAddAccomplishment = (na: CardAccomplishment) => {
  return async (dispatch: Dispatch<AddAccomplishementActions>) => {
    try {
      dispatch(new AddAccomplishmentRequest().asObj);
      const accmpModel = await GithopBackend.createAccomplishment(na);
      const updateAction = new AddAccomplishmentSuccess(accmpModel);
      dispatch(updateAction.asObj);
    } catch (e) {
      dispatch(new AddAccomplishmentFailure(e).asObj);
    }
  };
};

export const AsyncDeleteAccomplishment = (accomplishmentKey: string) => {
  return async (dispatch: Dispatch<DeleteAccomplishementActions>) => {
    try {
      dispatch(new DeleteAccomplishmentRequest().asObj);
      await GithopBackend.deleteAccomplishment(accomplishmentKey);
      dispatch(new DeleteAccomplishmentSuccess(accomplishmentKey).asObj);
    } catch (e) {
      dispatch(new DeleteAccomplishmentFailure(e).asObj);
    }
  };
};

export class ResumeLoad implements Action {
  readonly type = ResumeActionTypes.Load;
  get asObj() {
    return {
      type: this.type,
    };
  }
}

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

export class ResumeLoadFailure implements Action {
  readonly type = ResumeActionTypes.LoadFailure;
  constructor(public payload: string ) {}
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

export class AddAccomplishmentRequest implements Action {
  readonly type = ResumeActionTypes.AddAccomplishmentRequest;
  get asObj() {
    return {
      type: this.type
    };
  }
}

export class AddAccomplishmentSuccess implements Action {
  readonly type = ResumeActionTypes.AddAccomplishmentSuccess;
  constructor(public payload: CardAccomplishment) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class AddAccomplishmentFailure implements Action {
  readonly type = ResumeActionTypes.AddAccomplishmentFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class DeleteAccomplishmentRequest implements Action {
  readonly type = ResumeActionTypes.DeleteAccomplishmentRequest;
  get asObj() {
    return {
      type: this.type
    };
  }
}

export class DeleteAccomplishmentSuccess implements Action {
  readonly type = ResumeActionTypes.DeleteAccomplishmentSuccess;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class DeleteAccomplishmentFailure implements Action {
  readonly type = ResumeActionTypes.DeleteAccomplishmentFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export type DeleteAccomplishementActions = DeleteAccomplishmentRequest
    | DeleteAccomplishmentSuccess
    | DeleteAccomplishmentFailure;

export type AddAccomplishementActions = AddAccomplishmentRequest
    | AddAccomplishmentSuccess
    | AddAccomplishmentFailure;

export type UpdateAccomplishmentActions = UpdateAccomplishmentRequest
    | UpdateAccomplishmentSuccess
    | UpdateAccomplishmentFailure;

export type UpdateCardActions = UpdateCardRequest
    | UpdateCardSuccess
    | UpdateCardFailure;

export type ResumeActions = ResumeLoad
    | ResumeLoadFailure
    | ResumeLoadSuccess
    | UpdateCardActions
    | UpdateAccomplishmentActions
    | AddAccomplishementActions
    | DeleteAccomplishementActions;
