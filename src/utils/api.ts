import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://your-api-base-url.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;