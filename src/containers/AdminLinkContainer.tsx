import * as React from 'react';
import { IState } from '../reducers';
import { makeGetAuthState } from '../selectors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAuthState } from '../reducers/Auth';

interface Props {
  authState?: IAuthState;
  to: string;
  children?: any;
}

const AdminLinkContainer: React.StatelessComponent<Props> = (props: Props) => {
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
    to: ownProps.to
  });
  return mapStateToProps;
};

export default connect(
    makeMapStateToProps
)(AdminLinkContainer);