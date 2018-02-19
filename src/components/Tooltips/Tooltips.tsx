import * as React from 'react';
import { ITooltipState } from '../../reducers/Tooltip';
import { createTooltip, ToolTipModel } from '../../models';
import Tooltip from '../Tooltip';
import { ToolTipDismiss, ToolTipShow } from '../../actions';

interface Props {
  tooltips: ITooltipState;
  dismiss: (tip: ToolTipModel) => ToolTipDismiss;
  manual: (tip: ToolTipModel) => ToolTipShow;
}

const Tooltips: React.StatelessComponent<Props> = (props: Props) => {
  const { tooltips, dismiss, manual } = props;

  const renderDismiss = (tip: ToolTipModel) => {
    const customDispatch = tip.action != null ? tip.action : dismiss;

    if (tip.manual === false) {
      return null;
    }
    return (
        <button onClick={() => customDispatch(tip)}>{tip.buttonText}</button>
    );
  };

  const renderManual = () => {
    const tip = createTooltip(null, {manual: true, action: dismiss});
    manual(tip);
  };

  const renderTooltips = () => {
    if (tooltips == null) {
      return null;
    }
    const tooltipsArr = Object.keys(tooltips)
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

    if (tooltipsArr.length === 0) {
      return null;
    }

    return tooltipsArr.map((tooltip) => {
      return (
          <Tooltip
              key={tooltip.id}
              tooltipData={tooltip}
              render={
                ({tooltipData}: {tooltipData: ToolTipModel}) => (
                    <React.Fragment>
                      <p>{tooltipData.text}</p>
                      {renderDismiss(tooltipData)}
                    </React.Fragment>
                )}
          />
      );
    });
  };

  return (
      <React.Fragment>
        <button onClick={() => renderManual()}>add tooltip</button>
        {renderTooltips()}
        </React.Fragment>
  );
};

export default Tooltips;