import React, { createContext, useContext } from 'react';
import { Reservation, Room, UserResponse } from '../types';
import usePersistedReducer from '../utils/createPersistedReducer';
import createStorage from '../utils/createStorage';
import { Action } from './reducer';

export type State = {
  rooms: { [id: string]: Room };
  reservations: { [id: string]: Reservation };
  user: { [email: string]: UserResponse };
};

export const initialState = {
  rooms: {},
  reservations: {},
  user: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const storage = createStorage();

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, children }) => {
  const [state, dispatch] = usePersistedReducer(reducer, initialState, 'state', storage);
  return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};
export const useStateValue = () => useContext(StateContext);
