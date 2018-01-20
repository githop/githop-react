import * as React from 'react';
import Login from '../components/Login';
import { Dispatch } from 'redux';
import { AsyncLogin, LoginActions, LogoutEffects } from '../actions';
import { connect } from 'react-redux';
import { IState } from '../reducers';
import { makeGetAuthState } from '../selectors';
import { IAuthState } from '../reducers/Auth';

interface Props {
  login: (credentialsObj: { email: string, password: string }) => Promise<void>;
  logout: () => any;
  authState: IAuthState;
}

class LoginContainer extends React.Component<Props> {
  render() {
    if (!this.props.authState.isAuthenticated) {
      return <Login login={(c) => this.props.login(c)}/>;
    }

    return (
        <div className="page-root">
          <h1>Logout</h1>
          <button onClick={() => this.props.logout()}>logout</button>
        </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getAuthState = makeGetAuthState();
  const mapStateToProps = (state: IState) => ({
    authState: getAuthState(state)
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => ({
  login: (credentialsObj: { email: string, password: string }) => dispatch(AsyncLogin(credentialsObj)),
  logout: () => dispatch(LogoutEffects())
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(LoginContainer);