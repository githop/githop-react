import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AsyncLogin, LoginActions, LogoutEffects } from '../actions';
import Login from '../components/Login';
import { IState } from '../reducers';
import { IAuthState } from '../reducers/Auth';
import { makeGetAuthState } from '../selectors';

interface Props {
  login: (credentialsObj: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  authState: IAuthState;
}

class LoginContainer extends React.Component<Props> {
  render() {
    if (!this.props.authState.isAuthenticated) {
      return <Login login={c => this.props.login(c)} />;
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
    authState: getAuthState(state),
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => ({
  login: (credentialsObj: { email: string; password: string }) =>
    dispatch(AsyncLogin(credentialsObj) as any),
  logout: () => dispatch(LogoutEffects() as any),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(LoginContainer);
