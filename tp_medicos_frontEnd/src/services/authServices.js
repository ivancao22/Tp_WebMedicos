import api from './api';

/**
 * authService: funciones mínimas para login / logout / obtener usuario
 * - login(username, password): llama a POST /auth/login, guarda token y user en localStorage
 * - logout(): limpia token y user
 * - getToken(): devuelve token si existe
 * - getUser(): devuelve objeto user si existe
 * - isAuthenticated(): true si hay token
 */

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export async function login(username, password) {
  const res = await api.post('/auth/login', { username, password });
  const { token, user } = res.data;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getToken();
}