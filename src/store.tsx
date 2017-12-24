import { createStore, applyMiddleware } from 'redux';
import { StoreState } from './types//index';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as Reducers from './reducers/index';

export function configureStore() {
  const store = createStore<StoreState>(
    Reducers.default,
    applyMiddleware(
      thunkMiddleware,
      createLogger
    ));

  return store;
}