import { Action, Dispatch } from 'redux';
import { User } from '../models';
import { UserService } from '../lib';

export enum AuthActionTypes {
  LoginRequest = '[Login] Login request',
  LoginSuccess = '[Login Login success]',
  LoginFailure = '[Login] Login failure',
  Logout = '[Login] Logged out'
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

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
  get asObj() {
    return {
      type: this.type,
    };
  }
}

export type LoginActions = LoginRequest | LoginSuccess | LoginFailure | Logout;

export const AsyncLogin = ({email, password}: { email: string, password: string }) => {
  return async (dispatch: Dispatch<LoginActions>) => {
    try {
      dispatch(new LoginRequest().asObj);
      const userModel = await UserService.login(email, password);
      const userAction = new LoginSuccess(userModel);
      dispatch(userAction.asObj);
    } catch (e) {
      dispatch(new LoginFailure(e.message).asObj);
    }
  };
};

export const LogoutEffects = () => {
  return (dispatch: Dispatch<LoginActions>) => {
    dispatch(new Logout().asObj);
    UserService.logout();
  };
};