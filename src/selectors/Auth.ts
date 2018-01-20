import { IState } from '../reducers';
import { createSelector } from 'reselect';
import { IAuthState } from '../reducers/Auth';

const isAuthenticated = (state: IState): IAuthState => state.auth;

export const makeGetAuthState = () => {
  return createSelector(
      isAuthenticated,
      (authState: IAuthState) => {
        return authState;
      }
  );
};