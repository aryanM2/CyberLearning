import { apiRequest } from './api.js';

export const getCategoriesApi = async () => {
  return await apiRequest('/categories', {
    method: 'GET',
  });
};

export const getArticlesApi = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = queryString ? `/articles?${queryString}` : '/articles';
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

export const getArticleByIdApi = async (id) => {
  return await apiRequest(`/articles/${id}`, {
    method: 'GET',
  });
};

export const completeArticleApi = async (articleId) => {
  return await apiRequest(`/reading/${articleId}/complete`, {
    method: 'POST',
  });
};

export const getCompletedArticlesListApi = async () => {
  return await apiRequest('/reading/completed/list', {
    method: 'GET',
  });
};
