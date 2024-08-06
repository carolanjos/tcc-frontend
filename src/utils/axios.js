// src/axios.js
import axios from 'axios';

// Criando uma instância do axios com configuração personalizada
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/backoffice/', // URL base da API
  timeout: 10000, // Tempo limite para a requisição
});

// Interceptor para adicionar o token de autorização em cada requisição, se disponível
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
