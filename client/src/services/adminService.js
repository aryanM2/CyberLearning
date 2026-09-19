import { apiRequest } from './api.js';

export const getAdminUsersApi = async () => {
  return await apiRequest('/admin/users', {
    method: 'GET',
  });
};

export const updateUserRoleApi = async (id, data) => {
  return await apiRequest(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteUserApi = async (id) => {
  return await apiRequest(`/admin/users/${id}`, {
    method: 'DELETE',
  });
};

export const getAdminAnalyticsApi = async () => {
  return await apiRequest('/admin/analytics', {
    method: 'GET',
  });
};

// Admin Content CRUD helpers
export const createArticleApi = async (data) => {
  return await apiRequest('/articles', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateArticleApi = async (id, data) => {
  return await apiRequest(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteArticleApi = async (id) => {
  return await apiRequest(`/articles/${id}`, {
    method: 'DELETE',
  });
};

export const createChallengeApi = async (data) => {
  return await apiRequest('/challenges', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateChallengeApi = async (id, data) => {
  return await apiRequest(`/challenges/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteChallengeApi = async (id) => {
  return await apiRequest(`/challenges/${id}`, {
    method: 'DELETE',
  });
};

export const createAchievementApi = async (data) => {
  return await apiRequest('/achievements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const createRewardApi = async (data) => {
  return await apiRequest('/rewards', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
