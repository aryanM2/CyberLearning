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

export const forgotPasswordApi = async (email) => {
  return await apiRequest('/auth/forgotpassword', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordApi = async (token, password) => {
  return await apiRequest(`/auth/resetpassword/${token}`, {
    method: 'PUT',
    body: JSON.stringify({ password }),
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
