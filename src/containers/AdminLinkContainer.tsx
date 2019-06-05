import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../reducers';
import { IAuthState } from '../reducers/Auth';
import { makeGetAuthState } from '../selectors';

interface Props {
  authState?: IAuthState;
  to: string;
  children?: any;
}

const AdminLinkContainer: React.FC<Props> = (props: Props) => {
  const { authState, to } = props;
  if (authState && authState.isAuthenticated) {
    return <Link to={to}>{props.children}</Link>;
  }
  return null;
};

const makeMapStateToProps = (state: IState, ownProps: Props) => {
  const getAuthState = makeGetAuthState();
  const mapStateToProps = () => ({
    authState: getAuthState(state),
    to: ownProps.to,
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(AdminLinkContainer as any);
