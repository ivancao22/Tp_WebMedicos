import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Añade token automáticamente si existe en localStorage
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
}, err => Promise.reject(err));

// Manejo mínimo de respuesta: si recibimos 401, limpiamos token (opcional redirect)
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      // opcional: window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);



// Exporta la instancia por si hace falta usarla directamente
export default api;