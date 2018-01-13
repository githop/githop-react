import * as React from 'react';
import Login from '../components/Login';
import { Dispatch } from 'redux';
import { AsyncLogin, LoginActions } from '../actions';
import { connect } from 'react-redux';

interface Props {
  login: (credentialsObj: { email: string, password: string }) => Promise<void>;
}

class LoginContainer extends React.Component<Props> {
  render() {
    return (
        <Login login={(c) => this.props.login(c)}/>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => ({
  login: (credentialsObj: { email: string, password: string }) => dispatch(AsyncLogin(credentialsObj))
});

export default connect(
    null,
    mapDispatchToProps
)(LoginContainer);