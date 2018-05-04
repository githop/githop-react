import { Action, Dispatch } from 'redux';
import GithopBackend from '../lib/api-client';
import { CardAccomplishment, CardContent, IResumeState } from '../models';
import { dispatchPopover, TooltipActions } from './Tooltip';

export enum ResumeActionTypes {
  Load = '[Resume] Load',
  LoadSuccess = '[Resume] Load success',
  LoadFailure = '[Resume] Load failure',
  AddCardRequest = '[Resume] Add card request',
  AddCardSuccess = '[Resume] Add card success',
  AddCardFailure = '[Resume] Add card failure',
  UpdateCardRequest = '[Resume] Update card request',
  UpdateCardSuccess = '[Resume] Update card success',
  UpdateCardFailure = '[Resume] Update card failure',
  DeleteCardRequest = '[Resume] Delete card request',
  DeleteCardSuccess = '[Resume] Delete card success',
  DeleteCardFailure = '[Resume] Delete card failure',
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

export class ResumeLoad implements Action {
  readonly type = ResumeActionTypes.Load;
  get asObj() {
    return {
      type: this.type,
    } as ResumeLoad;
  }
}

export class ResumeLoadSuccess implements Action {
  readonly type = ResumeActionTypes.LoadSuccess;
  constructor(public payload: IResumeState) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as ResumeLoadSuccess;
  }
}

export class ResumeLoadFailure implements Action {
  readonly type = ResumeActionTypes.LoadFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as ResumeLoadFailure;
  }
}

export class AddCardRequest implements Action {
  readonly type = ResumeActionTypes.AddCardRequest;
  get asObj() {
    return {
      type: this.type,
    } as AddCardRequest;
  }
}

export class AddCardSuccess implements Action {
  readonly type = ResumeActionTypes.AddCardSuccess;
  constructor(public payload: CardContent) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as AddCardSuccess;
  }
}

export class AddCardFailure implements Action {
  readonly type = ResumeActionTypes.AddCardFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as AddCardFailure;
  }
}

export class UpdateCardRequest implements Action {
  readonly type = ResumeActionTypes.UpdateCardRequest;
  get asObj() {
    return {
      type: this.type,
    } as UpdateCardRequest;
  }
}

export class UpdateCardSuccess implements Action {
  readonly type = ResumeActionTypes.UpdateCardSuccess;
  constructor(public payload: CardContent) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as UpdateCardSuccess;
  }
}

export class UpdateCardFailure implements Action {
  readonly type = ResumeActionTypes.UpdateCardFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as UpdateCardFailure;
  }
}

export class DeleteCardRequest implements Action {
  readonly type = ResumeActionTypes.DeleteCardRequest;
  get asObj() {
    return {
      type: this.type,
    } as DeleteCardRequest;
  }
}

export class DeleteCardSuccess implements Action {
  readonly type = ResumeActionTypes.DeleteCardSuccess;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as DeleteCardSuccess;
  }
}

export class DeleteCardFailure implements Action {
  readonly type = ResumeActionTypes.DeleteCardFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as DeleteCardFailure;
  }
}

export class UpdateAccomplishmentRequest implements Action {
  readonly type = ResumeActionTypes.UpdateAccomplishmentRequest;
  get asObj() {
    return {
      type: this.type,
    } as UpdateAccomplishmentRequest;
  }
}

export class UpdateAccomplishmentSuccess implements Action {
  readonly type = ResumeActionTypes.UpdateAccomplishmentSuccess;
  constructor(public payload: CardAccomplishment) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as UpdateAccomplishmentSuccess;
  }
}

export class UpdateAccomplishmentFailure implements Action {
  readonly type = ResumeActionTypes.UpdateAccomplishmentFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as UpdateAccomplishmentFailure;
  }
}

export class AddAccomplishmentRequest implements Action {
  readonly type = ResumeActionTypes.AddAccomplishmentRequest;
  get asObj() {
    return {
      type: this.type,
    } as AddAccomplishmentRequest;
  }
}

export class AddAccomplishmentSuccess implements Action {
  readonly type = ResumeActionTypes.AddAccomplishmentSuccess;
  constructor(public payload: CardAccomplishment) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as AddAccomplishmentSuccess;
  }
}

export class AddAccomplishmentFailure implements Action {
  readonly type = ResumeActionTypes.AddAccomplishmentFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as AddAccomplishmentFailure;
  }
}

export class DeleteAccomplishmentRequest implements Action {
  readonly type = ResumeActionTypes.DeleteAccomplishmentRequest;
  get asObj() {
    return {
      type: this.type,
    } as DeleteAccomplishmentRequest;
  }
}

export class DeleteAccomplishmentSuccess implements Action {
  readonly type = ResumeActionTypes.DeleteAccomplishmentSuccess;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as DeleteAccomplishmentSuccess;
  }
}

export class DeleteAccomplishmentFailure implements Action {
  readonly type = ResumeActionTypes.DeleteAccomplishmentFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    } as DeleteAccomplishmentFailure;
  }
}

export type DeleteAccomplishementActions =
  | DeleteAccomplishmentRequest
  | DeleteAccomplishmentSuccess
  | DeleteAccomplishmentFailure;

export type AddAccomplishementActions =
  | AddAccomplishmentRequest
  | AddAccomplishmentSuccess
  | AddAccomplishmentFailure;

export type UpdateAccomplishmentActions =
  | UpdateAccomplishmentRequest
  | UpdateAccomplishmentSuccess
  | UpdateAccomplishmentFailure;

export type AddCardActions = AddCardRequest | AddCardSuccess | AddCardFailure;

export type UpdateCardActions =
  | UpdateCardRequest
  | UpdateAccomplishmentActions
  | UpdateCardSuccess
  | UpdateCardFailure;

export type DeleteCardActions = DeleteCardRequest | DeleteCardSuccess | DeleteCardFailure;

export type ResumeActions =
  | ResumeLoad
  | ResumeLoadFailure
  | ResumeLoadSuccess
  | AddCardActions
  | UpdateCardActions
  | DeleteCardActions
  | UpdateAccomplishmentActions
  | AddAccomplishementActions
  | DeleteAccomplishementActions;

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
  return async (dispatch: Dispatch<UpdateCardActions | TooltipActions>) => {
    try {
      dispatch(new UpdateCardRequest().asObj);
      const newContents = await GithopBackend.updateCardContent(nc.key, nc);
      const updateAction = new UpdateCardSuccess(newContents);
      dispatch(updateAction.asObj);
      await dispatchPopover('Card Updated!', dispatch);
    } catch (e) {
      dispatch(new UpdateCardFailure(e).asObj);
      await dispatchPopover(e, dispatch);
    }
  };
};

export const AsyncAddCard = (nc: CardContent) => {
  return async (dispatch: Dispatch<AddCardActions | TooltipActions>) => {
    try {
      dispatch(new AddCardRequest().asObj);
      const cardModel = await GithopBackend.addResumeCard(nc);
      const cardAction = new AddCardSuccess(cardModel);
      await dispatchPopover('Card Added', dispatch);
      dispatch(cardAction.asObj);
    } catch (e) {
      dispatch(new AddCardFailure(e).asObj);
      await dispatchPopover(e, dispatch);
    }
  };
};

export const AsyncUpdateAccomplishment = (na: CardAccomplishment) => {
  return async (dispatch: Dispatch<UpdateCardActions | TooltipActions>) => {
    try {
      dispatch(new UpdateAccomplishmentRequest().asObj);
      const accmpModel = await GithopBackend.updateAccomplishment(na.key, na);
      const updateAction = new UpdateAccomplishmentSuccess(accmpModel);
      dispatch(updateAction.asObj);
      await dispatchPopover('Accomplishment Updated!', dispatch);
    } catch (e) {
      dispatch(new UpdateAccomplishmentFailure(e).asObj);
      await dispatchPopover(e, dispatch);
    }
  };
};

export const AsyncAddAccomplishment = (na: CardAccomplishment) => {
  return async (dispatch: Dispatch<AddAccomplishementActions | TooltipActions>) => {
    try {
      dispatch(new AddAccomplishmentRequest().asObj);
      const accmpModel = await GithopBackend.createAccomplishment(na);
      const updateAction = new AddAccomplishmentSuccess(accmpModel);
      await dispatchPopover('Accomplishment Added!', dispatch);
      dispatch(updateAction.asObj);
    } catch (e) {
      dispatch(new AddAccomplishmentFailure(e).asObj);
      await dispatchPopover(e, dispatch);
    }
  };
};

export const AsyncDeleteAccomplishment = (accomplishmentKey: string) => {
  return async (dispatch: Dispatch<DeleteAccomplishementActions | TooltipActions>) => {
    try {
      dispatch(new DeleteAccomplishmentRequest().asObj);
      await GithopBackend.deleteAccomplishment(accomplishmentKey);
      dispatch(new DeleteAccomplishmentSuccess(accomplishmentKey).asObj);
      await dispatchPopover('Accomplishment Deleted!', dispatch);
    } catch (e) {
      dispatch(new DeleteAccomplishmentFailure(e).asObj);
      await dispatchPopover(e, dispatch);
    }
  };
};

export const AsyncDeleteCard = (rmCard: CardContent) => {
  return async (dispatch: Dispatch<DeleteCardActions | TooltipActions>) => {
    try {
      dispatch(new DeleteCardRequest().asObj);
      if (rmCard.accomplishments && rmCard.accomplishments.length > 0) {
        for (const accmp of rmCard.accomplishments) {
          const deleteAccmpAction = AsyncDeleteAccomplishment(accmp.key);
          await deleteAccmpAction(dispatch as any);
        }
      }
      await GithopBackend.deleteCard(rmCard.key);
      dispatch(new DeleteCardSuccess(rmCard.key).asObj);
      await dispatchPopover('Card Deleted!', dispatch);
    } catch (e) {
      dispatch(new DeleteCardFailure(e).asObj);
      await dispatchPopover(e, dispatch);
    }
  };
};
