import { IState } from '../reducers';
import { createSelector } from 'reselect';

const isAuthenticated = (state: IState): boolean => state.auth && state.auth.isAuthenticated;

export const makeIsAuthenticated = createSelector(
    isAuthenticated,
    (authState: boolean) => authState
);
