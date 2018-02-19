import * as React from 'react';
import { IState } from '../reducers';
import { connect } from 'react-redux';
import Tooltip from '../components/Tooltip';
import { ITooltipState } from '../reducers/Tooltip';
import { ToolTipModel } from '../models/Tooltip';

interface Props {
  tooltips: ITooltipState;
}

const mapStateToProps = (state: IState) => ({
  tooltips: state.tooltip
});

class TooltipContainer extends React.Component<Props, {}> {
  render() {
    return (
        <React.Fragment>{this.renderTooltips()}</React.Fragment>
    );
  }

  renderTooltips() {
    if (this.props.tooltips == null) {
      return null;
    }
    const tooltipsArr = Object.keys(this.props.tooltips)
        .reduce(
            (tooltips: ToolTipModel[], id: string) => {
              const tip = this.props.tooltips[id];
              if (tip != null && !tip.dismissed) {
                tooltips.push(tip);
              }
              return tooltips;
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
              text={tooltip.text}
              render={({text}) => (<p>{text}</p>)}
          />
      );
    });
  }
}

export default connect(
    mapStateToProps
)(TooltipContainer);