import React, { useEffect } from 'react';
import { Action, State } from '../state';

const usePersistedReducer = (
  reducer: React.Reducer<State, Action>,
  initialState: State,
  key: string,
  storage: any
): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = React.useReducer(reducer, storage.get(key, initialState));

  useEffect(() => {
    storage.set(key, state);
  }, [state, storage, key]);

  return [state, dispatch];
};

export default usePersistedReducer;
