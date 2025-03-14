import axios from "axios";

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/token/refresh/', { refresh: refreshToken });
        
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return originalRequest.data.config;
      } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // window.location.reload();
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;