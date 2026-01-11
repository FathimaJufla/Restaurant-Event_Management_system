import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh');
        const response = await axios.post(API_URL + 'auth/refresh/', {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access);
          api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
          return api(originalRequest);
        }
      } catch (err) {
        // Refresh token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
