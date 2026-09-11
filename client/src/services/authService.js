import { apiRequest } from './api.js';

export const registerApi = async (name, email, password, role = 'user') => {
  return await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
  });
};

export const loginApi = async (email, password) => {
  return await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getMeApi = async () => {
  return await apiRequest('/auth/me', {
    method: 'GET',
  });
};

export const logoutApi = async () => {
  return await apiRequest('/auth/logout', {
    method: 'POST',
  });
};
