import React, { createContext, useContext, useReducer } from 'react';
import { Reservation, Room, UserResponse } from '../types';
import { Action } from './reducer';

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

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};
export const useStateValue = () => useContext(StateContext);
