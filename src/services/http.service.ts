import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import store from '@/store';
import TokenService from '@/modules/Login/services/token.service';
import LocalStorageService from '@/services/localStorage.service';

const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 30000,
});

// Adiciona um interceptor de requisição para incluir o token de autenticação
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = LocalStorageService.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Alterado para usar "Token" em vez de "Bearer"
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Adiciona um interceptor de resposta para tratar erros
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      TokenService.logout();
    }
    return Promise.reject(error);
  }
);

export default http;
