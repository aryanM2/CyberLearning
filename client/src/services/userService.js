import { apiRequest } from './api.js';

export const getUserProfileApi = async () => {
  return await apiRequest('/users/profile', {
    method: 'GET',
  });
};

export const updateUserProfileApi = async (profileData) => {
  return await apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};
