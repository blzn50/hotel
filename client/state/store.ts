import { useMemo } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Reservation, Room, User, UserResponse } from '../types';
import { reducer } from './reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let store;

export type State = {
  rooms: { [id: string]: Room };
  reservations: { [id: string]: Reservation };
  user: { [email: string]: UserResponse };
};

const initialState = {
  rooms: {},
  reservations: {},
  user: {},
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function initStore(preloadedState = initialState) {
  return createStore(reducer, preloadedState, storeEnhancers(applyMiddleware(thunk)));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({ ...store.getStore(), ...preloadedState });
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
}
