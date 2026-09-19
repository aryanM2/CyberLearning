import { apiRequest } from './api.js';

export const getLeaderboardApi = async () => {
  return await apiRequest('/leaderboard', {
    method: 'GET',
  });
};
