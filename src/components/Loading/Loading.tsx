import * as React from 'react';
import './loading.css';

interface Props {
  size?: number;
  message?: string;
}

const Loading: React.StatelessComponent<Props> = (props: Props) => {
  const { size, message } = props;

  const setDimensions = () => {
    const sizeStr = size != null ? size + 'rem' : '20rem';
    return {
      width: sizeStr,
      height: sizeStr,
    };
  };

  const loaderSize = setDimensions();

  const renderMessage = () => {
    const messageStr = message != null ? message : 'Loading...';
    return <div className="gth-text">{messageStr}</div>;
  };

  return (
    <div className="gth-loading" style={loaderSize}>
      <div className="double-bounce1" />
      <div className="double-bounce2" />
      {renderMessage()}
    </div>
  );
};

export default Loading;
