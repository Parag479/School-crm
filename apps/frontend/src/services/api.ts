import axios from 'axios';
import { getMockResponse } from './mockData';

export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edumanage_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const resData = response.data;

    // Vercel SPA rewrite returns 200 OK with HTML for all routes including /api/v1/*
    // Detect this and serve mock data instead so the dashboard and other pages work
    if (
      typeof resData === 'string' &&
      (resData.trim().startsWith('<!') || resData.trim().startsWith('<html'))
    ) {
      const url = response.config?.url || '';
      const method = response.config?.method || 'get';
      let reqData = response.config?.data;
      try {
        if (typeof reqData === 'string') reqData = JSON.parse(reqData);
      } catch {}
      console.warn(`[EduManage API Fallback] HTML response detected for ${method.toUpperCase()} ${url}, serving mock data`);
      return getMockResponse(url, method, reqData);
    }

    return resData;
  },
  (error) => {
    const url = error.config?.url || '';
    const method = error.config?.method || 'get';
    let data = error.config?.data;
    try {
      if (typeof data === 'string') data = JSON.parse(data);
    } catch {}

    // If 404, 405 (Method Not Allowed on static Vercel), or Network Error:
    // Seamlessly provide mock data fallback so user can interact with CRM & portals
    if (
      !error.response ||
      error.response.status === 405 ||
      error.response.status === 404 ||
      error.response.status >= 500 ||
      error.code === 'ERR_NETWORK'
    ) {
      console.warn(`[EduManage API Fallback] Serving demo response for ${method.toUpperCase()} ${url}`);
      const mockResult = getMockResponse(url, method, data);
      return Promise.resolve(mockResult);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('edumanage_token');
      localStorage.removeItem('edumanage_user');
      // If not already on login page, redirect
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);
