import { TooltipActions, TooltipActionTypes } from '../actions/Tooltip';
import { ToolTipModel } from '../models/Tooltip';

export interface ITooltipStore {
  [key: string]: ToolTipModel;
}

export interface ITooltipState {
  tooltips: ITooltipStore;
}

const initialState = {} as ITooltipState;

export const tooltipReducer = (
  state = initialState,
  action: TooltipActions
): ITooltipState => {
  switch (action.type) {
    case TooltipActionTypes.Show:
    case TooltipActionTypes.Dismiss:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};
