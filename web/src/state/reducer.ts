import { Reservation, Room, SearchData, UserResponse } from '../types';
import { State } from './store';

export type Action =
  | {
      type: 'GET_SEARCH_RESULT';
      payload: Room[];
      additionalPayload: Room[];
      searchedData: SearchData;
    }
  | {
      type: 'SELECT_ROOM';
      payload: number;
    }
  | {
      type: 'REMOVE_ROOM';
      payload: number;
    }
  | {
      type: 'BOOK_RESERVATION';
      payload: Reservation;
    }
  | {
      type: 'LOGIN';
      payload: UserResponse;
    }
  | {
      type: 'REGISTER';
      payload: UserResponse;
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
        additionalRooms: {
          ...action.additionalPayload.reduce((memo, room) => ({ ...memo, [room.id]: room }), {}),
        },
        searchedData: {
          search: {
            ...action.searchedData,
          },
        },
      };
    case 'SELECT_ROOM':
      return {
        ...state,
        selectedRooms: state.selectedRooms.concat(action.payload),
      };
    case 'REMOVE_ROOM':
      return {
        ...state,
        selectedRooms: state.selectedRooms.filter(
          (roomInSelection) => roomInSelection !== action.payload
        ),
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
        selectedRooms: [],
        searchedData: {},
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

export const getSearchResult = (
  rooms: Room[],
  additionalRooms: Room[],
  data: SearchData
): Action => {
  return {
    type: 'GET_SEARCH_RESULT',
    payload: rooms,
    additionalPayload: additionalRooms,
    searchedData: data,
  };
};

export const selectRoomToBook = (roomNo: number): Action => {
  return {
    type: 'SELECT_ROOM',
    payload: roomNo,
  };
};
export const removeSelectedRoom = (roomNo: number): Action => {
  return {
    type: 'REMOVE_ROOM',
    payload: roomNo,
  };
};
