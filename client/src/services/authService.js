import apiClient from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  async login(credentials) {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify({ _id: data._id, name: data.name, email: data.email })
      );
    }
    return data;
  },

  async register(userInfo) {
    const data = await apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    });

    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify({ _id: data._id, name: data.name, email: data.email })
      );
    }
    return data;
  },

  async getMe() {
    return await apiClient('/auth/me');
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  getStoredUser() {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  getStoredToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};

export default authService;
