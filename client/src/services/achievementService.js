import { apiRequest } from './api.js';

export const getAchievementsApi = async () => {
  return await apiRequest('/achievements', {
    method: 'GET',
  });
};
