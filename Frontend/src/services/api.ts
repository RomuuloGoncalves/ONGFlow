import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const isProduction = import.meta.env.PROD;

const api: AxiosInstance = axios.create({
  baseURL: isProduction ? 'https://ongflow-backend.onrender.com/api' : '/api'
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    config.headers['ngrok-skip-browser-warning'] = '69420';

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;
