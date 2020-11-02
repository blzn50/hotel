import { State } from '../state';

const createStorage = (storage: Storage) => ({
  get(key: string, initialState: State) {
    const json = storage.getItem(key);
    return json === null ? initialState : JSON.parse(json);
  },
  set(key: string, value: any) {
    storage.setItem(key, JSON.stringify(value));
  },
  clear(key: string) {
    storage.removeItem(key);
  },
});

export default createStorage;
