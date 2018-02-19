import * as React from 'react';
import { ToolTipModel } from '../models';

interface Props {
  tooltipData?: ToolTipModel;
  render: (a?: any) => any;
}

export default class Tooltip extends React.Component<Props, {}> {
  render() {
    return (
        <React.Fragment>
          {this.props.render({tooltipData: this.props.tooltipData})}
        </React.Fragment>
    );
  }
}
