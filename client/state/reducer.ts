import { Reservation, Room, UserResponse } from '../types';
import { State } from './store';

export type Action =
  | {
      type: 'GET_SEARCH_RESULT';
      payload: Room[];
    }
  | {
      type: 'LOGIN';
      payload: UserResponse;
    }
  | {
      type: 'REGISTER';
      payload: UserResponse;
    }
  | {
      type: 'BOOK_RESERVATION';
      payload: Reservation;
    }
  | { type: 'LOGOUT' };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_SEARCH_RESULT':
      return {
        ...state,
        rooms: {
          ...action.payload.reduce((memo, room) => ({ ...memo, [room.id]: room }), {}),
        },
      };
    case 'BOOK_RESERVATION':
      return {
        ...state,
        reservations: {
          // some data here
        },
      };
    case 'REGISTER':
    case 'LOGIN':
      return {
        ...state,
        user: {
          [action.payload.user.email]: action.payload,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
