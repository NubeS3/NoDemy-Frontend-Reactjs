import axios, { AxiosInstance } from 'axios';

import endpoints from './endpoints.config';

const api: AxiosInstance = axios.create({
  baseURL: endpoints.base,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 10s
});

export default api;
