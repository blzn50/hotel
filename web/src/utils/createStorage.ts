import { State } from '../state';

const createStorage = () => ({
  get(key: string, initialState: State) {
    const json = localStorage.getItem(key);
    return json === null ? initialState : JSON.parse(json);
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clear(key: string) {
    localStorage.removeItem(key);
  },
});

export default createStorage;
