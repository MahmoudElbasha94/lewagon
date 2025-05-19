/*
ملف إعدادات API الرئيسي
هذا الملف يحتوي على الإعدادات الأساسية للتعامل مع API في التطبيق
سيتم استبداله بملف urls.py في Django
*/

import axios from 'axios';

// الحصول على عنوان API من متغيرات البيئة
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// إنشاء نسخة من axios مع الإعدادات الافتراضية
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة interceptor للطلبات للتعامل مع token المصادقة
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

// إضافة interceptor للاستجابات للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // التعامل مع رموز الأخطاء المحددة
      switch (error.response.status) {
        case 401:
          // غير مصرح - حذف token وإعادة التوجيه إلى صفحة تسجيل الدخول
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // محظور - إعادة التوجيه إلى الصفحة الرئيسية
          window.location.href = '/';
          break;
        case 404:
          // غير موجود - عرض رسالة خطأ
          console.error('Resource not found');
          break;
        default:
          // التعامل مع الأخطاء الأخرى
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// نقاط النهاية API
// سيتم استبدالها بملف urls.py في Django
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