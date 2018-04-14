import { Action, Dispatch } from 'redux';
import { ToolTipModel, createTooltip } from '../models';

export enum TooltipActionTypes {
  Show = '[Tooltip] Tooltip shown',
  Dismiss = '[Tooltip] Tooltip dismissed',
}

export class ToolTipShow implements Action {
  readonly type = TooltipActionTypes.Show;
  constructor(public payload: ToolTipModel) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export class ToolTipDismiss implements Action {
  readonly type = TooltipActionTypes.Dismiss;
  constructor(public payload: ToolTipModel) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export type TooltipActions = ToolTipShow | ToolTipDismiss;

export const dismissAction = (tip: ToolTipModel): Action => {
  tip.dismissed = true;
  return new ToolTipDismiss(tip).asObj;
};

export const showAction = (tip: ToolTipModel): Action => {
  return new ToolTipShow(tip).asObj;
};

const promiseTimeout = (len: number = 0) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), len);
  });
};

export const AsyncPopover = (tip: ToolTipModel, duration: number = 2000) => {
  return async (dispatch: Dispatch<TooltipActions>) => {
    dispatch(new ToolTipShow(tip).asObj);
    await promiseTimeout(duration);
    tip.dismissed = true;
    dispatch(new ToolTipDismiss(tip).asObj);
  };
};

export const dispatchPopover = <T extends TooltipActions>(
  message: string,
  dispatch: Dispatch<T>
) => {
  const toolip = createTooltip(message);
  const popover = AsyncPopover(toolip);
  return popover(dispatch);
};
