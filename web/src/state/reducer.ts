import { Reservation, Room, SearchData, UserResponse } from '../types';
import { State } from './store';

export type Action =
  | {
      type: 'GET_SEARCH_RESULT';
      payload: Room[];
      searchedData: SearchData;
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
        searchedData: {
          search: {
            ...action.searchedData,
          },
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
        reservations: {},
      };
    default:
      return state;
  }
};

export const login = (loginData: UserResponse): Action => {
  return {
    type: 'LOGIN',
    payload: loginData,
  };
};

export const register = (registerData: UserResponse): Action => {
  return {
    type: 'LOGIN',
    payload: registerData,
  };
};

export const logout = (): Action => {
  return {
    type: 'LOGOUT',
  };
};

export const getSearchResult = (rooms: Room[], data: SearchData): Action => {
  return {
    type: 'GET_SEARCH_RESULT',
    payload: rooms,
    searchedData: data,
  };
};
