import { Action, Dispatch } from 'redux';
import { User } from '../models/User';
import GithopBackend from '../api';

export enum AuthActionTypes {
  LoginRequest = '[Login] Login request',
  LoginSuccess = '[Login Login success]',
  LoginFailure = '[Login] Login failure'
}

export class LoginRequest implements Action {
  readonly type = AuthActionTypes.LoginRequest;
  get asObj() {
    return {
      type: this.type,
    };
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: User) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: string) {}
  get asObj() {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export type LoginActions = LoginRequest | LoginSuccess | LoginFailure;

export const AsyncLogin = ({email, password}: { email: string, password: string }) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    try {
      dispatch(new LoginRequest().asObj);
      const userModel = await GithopBackend.login(email, password);
      const userAction = new LoginSuccess(userModel);
      dispatch(userAction.asObj);
    } catch (e) {
      dispatch(new LoginFailure(e.message).asObj);
    }
  };
};