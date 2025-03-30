import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

interface RefreshResponse {
  access: string;
  refresh: string;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      console.log('poymal BLYAT DERGHI');
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post<RefreshResponse>('token/refresh/', {
          refresh: refreshToken,
        });

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        }
        return;
      } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // window.location.reload();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
