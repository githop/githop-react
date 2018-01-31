import './loading.css';
import * as React from 'react';

interface Props {

}

const Loading: React.StatelessComponent<Props> = (props: Props) => {
  return (
      <div className="gth-loading">
        <div className="double-bounce1"/>
        <div className="double-bounce2"/>
      </div>
  );
};

export default Loading;