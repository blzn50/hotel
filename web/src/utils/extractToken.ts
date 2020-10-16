import { storage, initialState, State } from '../state/store';

export function extractToken() {
  const state: State = storage.get('state', initialState);

  const userFromStorage = Object.values(state.user)[0];
  if (userFromStorage) {
    const token = userFromStorage.token;
    return token;
  }
  return undefined;
}
