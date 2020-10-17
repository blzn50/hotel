import axios from 'axios';
import { extractToken } from './extractToken';

export const baseApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authenticatedApi = () => {
  baseApi.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${extractToken()}`;
    console.log('config: ', config.headers['Authorization']);
    return config;
  });
};
