import './tooltips.css';
import * as React from 'react';
import { ToolTipModel } from '../../models';
import Tooltip from '../Tooltip/Tooltip';
import { ToolTipDismiss, ToolTipShow } from '../../actions';

interface Props {
  tooltips: ToolTipModel[];
  dismiss: (tip: ToolTipModel) => ToolTipDismiss;
  manual: (tip: ToolTipModel) => ToolTipShow;
}

const Tooltips: React.StatelessComponent<Props> = (props: Props) => {
  const { tooltips, dismiss } = props;

  const renderDismiss = (tip: ToolTipModel) => {
    if (tip.manual === false) {
      return null;
    }

    const customDispatch = tip.action != null ? tip.action : dismiss;
    return (
        <button
            className="button button-primary"
            onClick={() => customDispatch(tip)}
        >{tip.buttonText}
        </button>
    );
  };

  // const renderManual = () => {
  //   const tip = createTooltip('a really long tooltip with an explanation', {manual: true});
  //   manual(tip);
  // };

  const renderTooltips = () => {

    if (tooltips.length === 0) {
      return null;
    }

    return tooltips.map((tooltip) => {
      return (
          <Tooltip
              key={tooltip.id}
              tooltipData={tooltip}
              render={
                ({tooltipData}: { tooltipData: ToolTipModel }) => (
                    <div className="gth-tooltip --tooltip-enter">
                      <div>{tooltipData.text}</div>
                      <div>{renderDismiss(tooltipData)}</div>
                    </div>
                )}
          />
      );
    });
  };

  return (
      <React.Fragment>
        {/*<button onClick={() => renderManual()}>add tooltip</button>*/}
        <div className="gth-tooltips">
          {renderTooltips()}
        </div>
      </React.Fragment>
  );
};

export default Tooltips;