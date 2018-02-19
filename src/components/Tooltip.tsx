import * as React from 'react';

interface Props {
  text?: string;
  render: (a?: any) => any;
}

export default class Tooltip extends React.Component<Props, {}> {
  static defaultProps = {
    text: 'hello world!'
  };

  render() {
    return (
        <React.Fragment>
          {this.props.render({text: this.props.text})}
        </React.Fragment>
    );
  }
}
