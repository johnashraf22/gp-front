import axios, { InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    // Don't override Content-Type if it's multipart/form-data
    if (config.headers && config.headers['Content-Type'] === 'multipart/form-data') {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }

    // For regular requests, set both Content-Type and Authorization
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Product types
export interface Product {
  id: number;
  name: string;
  image: string;
  type: 'book' | 'clothes';
  price: number;
  rating: number;
}

// Payload for updating a product
export interface UpdateProductPayload {
  name: string;
  description: string;
  category: string;
  condition: string;
}

// Order types
export interface Order {
  id: number;
  user: { id: number; name: string; email: string };
  items: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    type: string;
  }>;
  total: number;
  status: string;
  createdAt: string;
}

// Product API functions
export const productApi = {
  getProducts: async (type: 'book' | 'clothes' | 'all' = 'all'): Promise<Product[]> => {
    const response = await api.get(`/products?type=${type}`);
    return response.data.data || [];
  },
      
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    console.log( "response.data.data", response.data.data);
    return response.data.data;
  },
  updateProduct: async (id: number, data: UpdateProductPayload): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data.data;
  },
};

// Order API functions
export const orderApi = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data.data || [];
  },
  getAdminOrders: async (): Promise<Order[]> => {
    const response = await api.get('/admin-orders');
    return response.data.data || [];
  },
};

export default api; 