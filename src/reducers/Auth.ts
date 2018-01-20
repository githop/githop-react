import { AuthActionTypes, LoginActions } from '../actions';
import { getLocalUser } from '../lib';
import { User } from '../models';

export interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
}

const setInitialState = (): IAuthState => {
  const user = getLocalUser();
  return {
    user,
    isAuthenticated: !!user,
    error: ''
  } as IAuthState;
};

export const userReducer = (state = setInitialState(), action: LoginActions): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return {
        user: action.payload,
        isAuthenticated: true,
        error: ''
      };
    case AuthActionTypes.LoginFailure:
      return {
        user: null,
        isAuthenticated: false,
        error: action.payload
      };
    case AuthActionTypes.Logout:
      return {
        user: null,
        isAuthenticated: false,
        error: ''
      };
    default:
      return state;
  }
};