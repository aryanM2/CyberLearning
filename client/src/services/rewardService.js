import { apiRequest } from './api.js';

export const getRewardsApi = async () => {
  return await apiRequest('/rewards', {
    method: 'GET',
  });
};

export const redeemRewardApi = async (id) => {
  return await apiRequest(`/rewards/${id}/redeem`, {
    method: 'POST',
  });
};
