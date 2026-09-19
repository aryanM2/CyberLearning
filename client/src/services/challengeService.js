import { apiRequest } from './api.js';

export const getChallengesApi = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = queryString ? `/challenges?${queryString}` : '/challenges';
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

export const getChallengeByIdApi = async (id) => {
  return await apiRequest(`/challenges/${id}`, {
    method: 'GET',
  });
};

export const submitChallengeApi = async (id, submissionData) => {
  return await apiRequest(`/challenges/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify(submissionData),
  });
};
