import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - redirect to home
          window.location.href = '/';
          break;
        case 404:
          // Not found - show toast or handle specifically
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    profile: '/auth/profile',
  },
  courses: {
    list: '/courses',
    detail: (id: string) => `/courses/${id}`,
    create: '/courses',
    update: (id: string) => `/courses/${id}`,
    delete: (id: string) => `/courses/${id}`,
    enroll: (id: string) => `/courses/${id}/enroll`,
    review: (id: string) => `/courses/${id}/review`,
  },
  categories: {
    list: '/categories',
    detail: (id: string) => `/categories/${id}`,
    create: '/categories',
    update: (id: string) => `/categories/${id}`,
    delete: (id: string) => `/categories/${id}`,
  },
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    updateRole: (id: string) => `/users/${id}/role`,
    updateStatus: (id: string) => `/users/${id}/status`,
  },
  support: {
    tickets: '/support/tickets',
    ticket: (id: string) => `/support/tickets/${id}`,
    reply: (id: string) => `/support/tickets/${id}/reply`,
  },
  coupons: {
    list: '/coupons',
    create: '/coupons',
    update: (id: string) => `/coupons/${id}`,
    delete: (id: string) => `/coupons/${id}`,
    validate: (code: string) => `/coupons/${code}/validate`,
  },
  settings: {
    get: '/settings',
    update: '/settings',
  },
}; 