import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const viteUrl = import.meta.env.VITE_API_URL;
const choreoUrl = '/choreo-apis/django-react/backend/rest-api-be2/v1.0';

const api = axios.create({
  baseURL: viteUrl ? viteUrl : choreoUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
