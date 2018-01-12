import { applyMiddleware, compose, createStore, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import { IState, state } from './reducers';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<IState> = createStore(
  state,
  composeEnhancers(applyMiddleware(reduxThunk))
);