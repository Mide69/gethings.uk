import axios from 'axios';
import { Business, BusinessFilters, Message, User } from '../types';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string, role: 'customer' | 'vendor') => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const businessAPI = {
  getBusinesses: async (filters: BusinessFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await api.get(`/businesses?${params.toString()}`);
    return response.data;
  },

  getBusiness: async (id: string): Promise<Business> => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  },

  createBusiness: async (businessData: FormData) => {
    const response = await api.post('/businesses', businessData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateBusiness: async (id: string, businessData: FormData) => {
    const response = await api.put(`/businesses/${id}`, businessData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteBusiness: async (id: string) => {
    const response = await api.delete(`/businesses/${id}`);
    return response.data;
  },

  getVendorBusinesses: async (): Promise<Business[]> => {
    const response = await api.get('/businesses/vendor/my-businesses');
    return response.data;
  },
};

export const messageAPI = {
  sendMessage: async (businessId: string, subject: string, message: string) => {
    const response = await api.post('/messages', { businessId, subject, message });
    return response.data;
  },

  getMessages: async (type: 'sent' | 'received' = 'received'): Promise<Message[]> => {
    const response = await api.get(`/messages?type=${type}`);
    return response.data;
  },

  markAsRead: async (messageId: string) => {
    const response = await api.put(`/messages/${messageId}/read`);
    return response.data;
  },
};