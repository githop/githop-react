import './loading.css';
import * as React from 'react';

interface Props {
  size?: number;
  message?: string;
}

const Loading: React.StatelessComponent<Props> = (props: Props) => {
  const { size, message } = props;

  const setDimensions = () => {
    const _size = size != null ? size + 'rem' : '20rem';
    return {
      width: _size,
      height: _size
    };
  };

  const loaderSize = setDimensions();

  const renderMessage = () => {
    const _message = message != null ? message : 'Loading...';
    return <div className="gth-text">{_message}</div>;
  };

  return (
      <div className="gth-loading" style={loaderSize}>
        <div className="double-bounce1"/>
        <div className="double-bounce2"/>
        {renderMessage()}
      </div>
  );
};

export default Loading;