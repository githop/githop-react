import { IState } from '../reducers';
import { ITooltipState } from '../reducers/Tooltip';
import { createSelector } from 'reselect';
import { ToolTipModel } from '../models';

const getTooltipsState = (state: IState): ITooltipState => state.tooltip;

export const getTooltips = createSelector(
    getTooltipsState,
    (tooltips: ITooltipState): ToolTipModel[] => {
      if (tooltips == null) {
        return [];
      }
      return Object.keys(tooltips)
          .reduce(
              (xsTooltips: ToolTipModel[], id: string) => {
                const tip = tooltips[id];
                if (tip != null && !tip.dismissed) {
                  xsTooltips.push(tip);
                }
                return xsTooltips;
              },
              []
          );
    }
);