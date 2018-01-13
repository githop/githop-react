import { User } from '../models/User';
import { AuthActionTypes, LoginActions } from '../actions';

export interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
}

const initialAuthState = {
  user: {},
  isAuthenticated: false,
  error: ''
} as IAuthState;

export const userReducer = (state = initialAuthState, action: LoginActions): IAuthState => {
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
    default:
      return state;
  }
};